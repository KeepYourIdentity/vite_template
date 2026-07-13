import cluster from "cluster";
import fs from "fs";
import path from "path";

const LOG_CONFIG = {
  DIR: path.join(process.cwd(), "system-logs"),
  RETENTION_MONTHS: 1,
} as const;

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  security: 2,
  info: 3,
  success: 4,
  debug: 5,
} as const;

type LogLevel = keyof typeof LOG_LEVELS;
type LogMetadata = Record<string, unknown>;

const COLORS: Record<LogLevel | "reset", string> = {
  error: "\x1b[1;91m",
  warn: "\x1b[1;93m",
  security: "\x1b[1;95m",
  info: "\x1b[1;96m",
  success: "\x1b[1;92m",
  debug: "\x1b[1;90m",
  reset: "\x1b[0m",
} as const;

const SENSITIVE_KEY_PATTERN = /(password|pass|token|authorization|secret|apikey|api_key|pin|cvv|otp|cookie|bearer)/i;

const getEnv = (): string => process.env.NODE_ENV || "development";
const getAppName = (): string => process.env.APP_NAME || "Unknown";
const isProduction = (): boolean => getEnv() === "production";

const getMinLevel = (): number => {
  const configured = (process.env.LOG_LEVEL || "debug").toLowerCase() as LogLevel;
  return LOG_LEVELS[configured] ?? LOG_LEVELS.debug;
};

const getTimestamp = (): string => new Date().toISOString();

const getDateString = (): string => new Date().toISOString().slice(0, 10);

const getWorkerId = (): string => {
  if (cluster.isWorker && cluster.worker) {
    return `W${cluster.worker.id}`;
  }
  return "M";
};

const normalizeMetadata = (key: string, value: unknown): unknown => {
  if (SENSITIVE_KEY_PATTERN.test(key)) return "[REDACTED]";

  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      ...(isProduction() ? {} : { stack: value.stack }),
    };
  }

  if (Array.isArray(value)) {
    return value.map((item, i) => normalizeMetadata(String(i), item));
  }

  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, normalizeMetadata(k, v)])
    );
  }

  return value;
};

const serializeMetadata = (metadata: LogMetadata): string => {
  if (Object.keys(metadata).length === 0) return "";

  const parts = Object.entries(metadata).map(([k, v]) => {
    const normalized = normalizeMetadata(k, v);
    const str = typeof normalized === "object" && normalized !== null ? JSON.stringify(normalized) : String(normalized);
    return `${k}=${str}`;
  });

  return ` || [${parts.join(" | ")}]`;
};

class SystemLogger {
  private currentDate: string;
  private logFilePath: string;
  private writeStream: fs.WriteStream | null = null;
  private isShuttingDown = false;

  constructor() {
    this.currentDate = getDateString();
    this.logFilePath = this._buildFilePath(this.currentDate);

    this._ensureLogDirectory();
    this._openStream();
    this._setupGracefulShutdown();

    setTimeout(() => this._cleanOldLogs(), 0);
  }

  info(category: string, message: string, metadata: LogMetadata = {}): void {
    this._write("info", category, message, metadata);
  }

  success(category: string, message: string, metadata: LogMetadata = {}): void {
    this._write("success", category, message, metadata);
  }

  warn(category: string, message: string, metadata: LogMetadata = {}): void {
    this._write("warn", category, message, metadata);
  }

  error(category: string, message: string, metadata: LogMetadata = {}): void {
    this._write("error", category, message, metadata);
  }

  debug(category: string, message: string, metadata: LogMetadata = {}): void {
    this._write("debug", category, message, metadata);
  }

  security(category: string, message: string, metadata: LogMetadata = {}): void {
    this._write("security", category, message, metadata);
  }

  requestReceived(
    method: string,
    url: string,
    ip: string,
    headers: Record<string, string | string[] | undefined> = {}
  ): void {
    this.info("REQUEST", `${method} ${url}`, {
      ip,
      userAgent: headers["user-agent"]?.toString().slice(0, 100) || "unknown",
    });
  }

  responseSuccess(method: string, url: string, status: number, durationMs: number): void {
    this.success("RESPONSE", `${method} ${url} -> ${status}`, { durationMs });
  }

  responseError(method: string, url: string, status: number, error: unknown, durationMs: number): void {
    this.error("RESPONSE", `${method} ${url} -> ${status}`, {
      error: error instanceof Error ? error : String(error),
      durationMs,
    });
  }

  private _isLevelActive(level: LogLevel): boolean {
    return LOG_LEVELS[level] <= getMinLevel();
  }

  private _write(level: LogLevel, category: string, message: string, metadata: LogMetadata): void {
    if (!this._isLevelActive(level)) return;
    if (this.isShuttingDown) return;

    try {
      const today = getDateString();
      if (today !== this.currentDate) {
        this._rotateStream(today);
      }

      const entry = this._format(level, category, message, metadata);

      if (this.writeStream?.writable) {
        this.writeStream.write(`${entry}\n`);
      }

      this._writeToConsole(level, entry);
    } catch {}
  }

  private _format(level: LogLevel, category: string, message: string, metadata: LogMetadata): string {
    const ts = getTimestamp();
    const pid = process.pid;
    const wid = getWorkerId();
    const lvl = level.toUpperCase().padEnd(8);
    const cat = category.padEnd(20);
    const meta = serializeMetadata(metadata);

    return `[${ts}] [${wid}:${pid}] [${lvl}] [${cat}] [${message}]${meta}`;
  }

  private _writeToConsole(level: LogLevel, entry: string): void {
    const colored = `${COLORS[level]}${entry}${COLORS.reset}`;

    if (level === "error" || level === "warn") {
      process.stderr.write(`${colored}\n`);
    } else {
      process.stdout.write(`${colored}\n`);
    }
  }

  private _buildFilePath(date: string): string {
    return path.join(LOG_CONFIG.DIR, `system-${date}.log`);
  }

  private _openStream(): void {
    const filePath = this._buildFilePath(this.currentDate);
    this.logFilePath = filePath;

    const isNewFile = !fs.existsSync(filePath) || fs.statSync(filePath).size === 0;

    const stream = fs.createWriteStream(filePath, { flags: "a" });

    stream.on("error", (err) => {
      process.stderr.write(`[SYSTEM LOGGER] Stream error: ${err.message}\n`);
    });

    stream.on("open", () => {
      const header = isNewFile ? this._buildHeader() : this._buildSessionSeparator();
      stream.write(header);
    });

    this.writeStream = stream;
  }

  private _rotateStream(newDate: string): void {
    const oldStream = this.writeStream;

    this.currentDate = newDate;
    this.logFilePath = this._buildFilePath(newDate);

    this._openStream();

    if (oldStream) {
      oldStream.end(() => {
        process.stdout.write(`[SYSTEM LOGGER] Rotated log to: system-${newDate}.log\n`);
      });
    }
  }

  private _cleanOldLogs(): void {
    try {
      const files = fs.readdirSync(LOG_CONFIG.DIR);
      const cutoff = new Date();
      cutoff.setMonth(cutoff.getMonth() - LOG_CONFIG.RETENTION_MONTHS);
      cutoff.setUTCHours(0, 0, 0, 0);

      let deletedCount = 0;

      for (const file of files) {
        const match = file.match(/^system-(\d{4}-\d{2}-\d{2})\.log$/);
        if (!match) continue;

        const fileDate = new Date(match[1]!);
        if (isNaN(fileDate.getTime())) continue;

        if (fileDate < cutoff) {
          fs.unlinkSync(path.join(LOG_CONFIG.DIR, file));
          deletedCount++;
        }
      }

      if (deletedCount > 0) {
        this.info("LOG_CLEANUP", `Deleted ${deletedCount} old log file(s)`, {
          cutoffDate: cutoff.toISOString().slice(0, 10),
          retentionMonths: LOG_CONFIG.RETENTION_MONTHS,
        });
      }
    } catch (err) {
      process.stderr.write(`[SYSTEM LOGGER] Failed to clean old logs: ${String(err)}\n`);
    }
  }

  private _setupGracefulShutdown(): void {
    const shutdown = (signal: string): void => {
      if (this.isShuttingDown) return;
      this.isShuttingDown = true;

      const farewell = `\n[${getTimestamp()}] [SYSTEM] Logger shutting down (${signal})...\n`;

      if (this.writeStream?.writable) {
        this.writeStream.write(farewell, () => {
          this.writeStream!.end();
        });
      }
    };

    process.once("exit", () => shutdown("exit"));

    process.once("SIGTERM", () => {
      shutdown("SIGTERM");

      setTimeout(() => process.exit(0), 300);
    });

    process.once("SIGINT", () => {
      shutdown("SIGINT");
      setTimeout(() => process.exit(0), 300);
    });
  }

  private _ensureLogDirectory(): void {
    fs.mkdirSync(LOG_CONFIG.DIR, { recursive: true });
  }

  private _buildHeader(): string {
    const border = "=".repeat(100);
    return [
      border,
      `SYSTEM LOG FILE  : ${this.currentDate}`,
      `Application      : ${getAppName()}`,
      `Environment      : ${getEnv()}`,
      `Node Version     : ${process.version}`,
      `Started At (UTC) : ${getTimestamp()}`,
      `PID              : ${process.pid} [${getWorkerId()}]`,
      border,
      "",
      "",
    ].join("\n");
  }

  private _buildSessionSeparator(): string {
    const line = "-".repeat(40);
    return `\n\n${line} [ SESSION | PID:${process.pid} | ${getWorkerId()} | ${getTimestamp()} ] ${line}\n\n`;
  }
}

const logger = new SystemLogger();
export default logger;
