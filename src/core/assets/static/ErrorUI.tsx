import { useDarkTheme } from "core/store";
import { saveAs } from "file-saver";
import { ArrowLeft, DownloadCloud, LogIn, RefreshCcw, TriangleAlert } from "lucide-react";
import { useCallback, useMemo } from "react";

import type { ReactElement, ReactNode } from "react";

interface ErrorUIProps {
  title?: ReactNode;
  message: ReactNode;
  rawError?: unknown;
  Reloadable?: boolean;
  CanBack?: boolean;
  CanBackToLogin?: boolean;
  BackToLoginAction?: () => void;
  CanDownloadError?: boolean;
  CanSendErrorAutomatically?: boolean;
  // SendErrorAutomaticallyAction?: () => void;
}

const getFormattedLogName = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const date = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const mins = String(d.getMinutes()).padStart(2, "0");

  return `Error_${year}${month}${date}-${hours}${mins}.log`;
};

const actionButtonBase =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors not-disabled:cursor-pointer";

export default function ErrorUI({
  title = "Terjadi Kesalahan",
  message,
  rawError,
  Reloadable = false,
  CanBack = false,
  CanBackToLogin = false,
  BackToLoginAction,
  CanDownloadError = false,
  CanSendErrorAutomatically = false,
  // SendErrorAutomaticallyAction,
}: ErrorUIProps): ReactElement {
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);

  const noNeedAction = [Reloadable, CanBack, CanBackToLogin, CanDownloadError, CanSendErrorAutomatically].reduce(
    (accumulation, current) => accumulation && !current,
    true
  );

  const parsedError = useMemo<string>(() => {
    if (!rawError) return "Detail error tidak diketahui";
    if (rawError instanceof Error) return rawError.stack || rawError.message;
    if (typeof rawError === "string") return rawError;
    try {
      return JSON.stringify(rawError, null, 2);
    } catch {
      return "Detail error tidak dapat di-parse menjadi teks.";
    }
  }, [rawError]);

  const logFileName = useMemo(() => getFormattedLogName(), []);

  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  const handleGoBack = useCallback(() => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  }, []);

  const handleGoToLogin = useCallback(() => {
    BackToLoginAction?.();
    window.location.href = "/login";
  }, [BackToLoginAction]);

  const handleDownloadLog = useCallback(() => {
    const header = [
      `Log File     : ${logFileName}`,
      `Generated At : ${new Date().toISOString()}`,
      `User Agent   : ${window.navigator.userAgent}`,
      `URL          : ${window.location.href}`,
      "-".repeat(60),
      "",
    ].join("\n");

    const blob = new Blob([header, parsedError], { type: "text/plain;charset=utf-8" });
    saveAs(blob, logFileName);
  }, [logFileName, parsedError]);

  return (
    <div
      className={`flex-1 min-h-0 xy-center flex-col p-4 ${isDarkTheme ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"}`}
    >
      <div
        className={`max-w-2xl w-full rounded-lg shadow-md p-6 sm:p-8 border-t-4 border-red-500 ${isDarkTheme ? "bg-gray-950" : "bg-white"}`}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-red-500 mb-2 flex items-center gap-3">
          <TriangleAlert className="size-8" /> <span>{title}</span>
        </h1>

        <p className={`mb-6 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>{message}</p>

        {import.meta.env.DEV && parsedError && (
          <div className={`rounded-md p-4 mb-6 ${isDarkTheme ? "bg-gray-800" : "bg-gray-100"}`}>
            <strong
              className={`block text-sm mb-2 uppercase tracking-wide ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}
            >
              Detail Error (DEV Only):
            </strong>
            <div className="overflow-auto">
              <pre className="text-red-500 text-sm font-mono">{parsedError}</pre>
            </div>
          </div>
        )}

        {import.meta.env.PROD && (
          <div className={`rounded-md p-4 mb-6 ${isDarkTheme ? "bg-gray-800" : "bg-gray-100"}`}>
            <strong
              className={`block text-sm mb-2 uppercase tracking-wide ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}
            >
              Kami akan sangat menghargai jika anda berkenan untuk mengirimkan file{" "}
              <span className="rounded p-1 bg-red-300 text-red-500 normal-case font-mono">{logFileName}</span> kepada
              kami para pengembang website ini
            </strong>
          </div>
        )}

        {!noNeedAction && (
          <div className="flex flex-wrap gap-3">
            {Reloadable && (
              <button type="button" onClick={handleRefresh} className={`${actionButtonBase} bg-primary`}>
                <RefreshCcw className="size-4" />
                Muat Ulang Halaman
              </button>
            )}

            {CanBack && (
              <button
                type="button"
                onClick={handleGoBack}
                className={`${actionButtonBase} ${
                  isDarkTheme
                    ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <ArrowLeft className="size-4" />
                Kembali
              </button>
            )}

            {CanBackToLogin && (
              <button
                type="button"
                onClick={handleGoToLogin}
                className={`${actionButtonBase} ${
                  isDarkTheme
                    ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <LogIn className="size-4" />
                Ke Halaman Login
              </button>
            )}

            {CanDownloadError && (
              <button
                type="button"
                onClick={handleDownloadLog}
                className={`${actionButtonBase} bg-red-500 text-white hover:bg-red-600`}
              >
                <DownloadCloud className="size-4" />
                Unduh Log Error
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
