import { z } from "zod";

const schema = z.object({
  VITE_WEBSITE_NAME: z
    .string()
    .transform((val) => val.replace(/^["'`]+|["'`]+$/g, ""))
    .pipe(z.string().trim().min(1).catch("")),
  VITE_WEBSITE_VERSION: z
    .string()
    .transform((val) => val.replace(/^["'`]+|["'`]+$/g, ""))
    .pipe(z.string().trim().min(1).catch("0.0.0")),
  VITE_WEBSITE_DESCRIPTION: z
    .string()
    .transform((val) => val.replace(/^["'`]+|["'`]+$/g, ""))
    .pipe(z.string().trim().min(1).catch("")),
  VITE_ENV: z.enum(["Development", "Staging", "Production"]),
  VITE_SERVER_URL: z.url(),
  VITE_SERVER_BASE_PATH: z
    .string()
    .transform((val) => val.replace(/^["'`]+|["'`]+$/g, ""))
    .pipe(z.string().trim().min(1).catch("")),
  VITE_SERVER_PUBLIC_KEY: z
    .string()
    .transform((val) => val.replace(/^["'`]+|["'`]+$/g, ""))
    .pipe(z.string().trim().length(32)),
  VITE_SERVER_LOGGING: z
    .string()
    .trim()
    .transform((val) => ["1", "true", "yes", "on"].includes(val.toLowerCase()))
    .pipe(z.boolean()),
  VITE_SERVER_TIMEOUT: z
    .string()
    .trim()
    .transform((val) => Number.parseInt(val, 10))
    .pipe(z.number().int().min(1).catch(30000)),
  VITE_SERVER_RETRY_COUNT: z
    .string()
    .trim()
    .transform((val) => Number.parseInt(val, 10))
    .pipe(z.number().int().min(1).catch(3)),
});

const source = {
  VITE_WEBSITE_NAME: import.meta.env.VITE_WEBSITE_NAME,
  VITE_WEBSITE_VERSION: import.meta.env.VITE_WEBSITE_VERSION,
  VITE_WEBSITE_DESCRIPTION: import.meta.env.VITE_WEBSITE_DESCRIPTION,
  VITE_ENV: import.meta.env.VITE_ENV,
  VITE_SERVER_URL: import.meta.env.VITE_SERVER_URL,
  VITE_SERVER_BASE_PATH: import.meta.env.VITE_SERVER_BASE_PATH,
  VITE_SERVER_PUBLIC_KEY: import.meta.env.VITE_SERVER_PUBLIC_KEY,
  VITE_SERVER_LOGGING: import.meta.env.VITE_SERVER_LOGGING,
  VITE_SERVER_TIMEOUT: import.meta.env.VITE_SERVER_TIMEOUT,
  VITE_SERVER_RETRY_COUNT: import.meta.env.VITE_SERVER_RETRY_COUNT,
} as const;

const { success, data, error } = schema.safeParse(source);

const env = success
  ? {
      WEBSITE_NAME: data.VITE_WEBSITE_NAME as string,
      WEBSITE_VERSION: data.VITE_WEBSITE_VERSION as string,
      WEBSITE_DESCRIPTION: data.VITE_WEBSITE_DESCRIPTION as string,
      ENV: data.VITE_ENV as "Development" | "Staging" | "Production",
      SERVER_URL: data.VITE_SERVER_URL as string,
      SERVER_BASE_PATH: data.VITE_SERVER_BASE_PATH as string,
      SERVER_PUBLIC_KEY: data.VITE_SERVER_PUBLIC_KEY as string,
      SERVER_LOGGING: data.VITE_SERVER_LOGGING as boolean,
      SERVER_TIMEOUT: data.VITE_SERVER_TIMEOUT as number,
      SERVER_RETRY_COUNT: data.VITE_SERVER_RETRY_COUNT as number,
    }
  : null;
const envError = success ? null : error;
const envValid = success;

export { env, envError, envValid };
