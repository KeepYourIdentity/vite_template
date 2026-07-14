import { DeepFreeze } from "core/utils";
import { z } from "zod";

const schema = z.object({
  WEBSITE_NAME: z
    .string()
    .transform((val) => val.replace(/^["'`]+|["'`]+$/g, ""))
    .pipe(z.string().trim().min(1).catch("")),
  WEBSITE_VERSION: z
    .string()
    .transform((val) => val.replace(/^["'`]+|["'`]+$/g, ""))
    .pipe(z.string().trim().min(1).catch("0.0.0")),
  WEBSITE_DESCRIPTION: z
    .string()
    .transform((val) => val.replace(/^["'`]+|["'`]+$/g, ""))
    .pipe(z.string().trim().min(1).catch("")),
  ENV: z.enum(["Development", "Staging", "Production"]),
  SERVER_URL: z.url(),
  SERVER_BASE_PATH: z
    .string()
    .transform((val) => val.replace(/^["'`]+|["'`]+$/g, ""))
    .pipe(z.string().trim().min(1).catch("")),
  SERVER_PUBLIC_KEY: z
    .string()
    .transform((val) => val.replace(/^["'`]+|["'`]+$/g, ""))
    .pipe(z.string().trim().length(32)),
  SERVER_LOGGING: z
    .string()
    .trim()
    .transform((val) => ["1", "true", "yes", "on"].includes(val.toLowerCase()))
    .pipe(z.boolean()),
  SERVER_TIMEOUT: z
    .string()
    .trim()
    .transform((val) => Number.parseInt(val, 10))
    .pipe(z.number().int().min(1).catch(30000)),
  SERVER_RETRY_COUNT: z
    .string()
    .trim()
    .transform((val) => Number.parseInt(val, 10))
    .pipe(z.number().int().min(1).catch(3)),
  SERVER_NEED_HEADER_WHILE_REQUEST: z
    .string()
    .trim()
    .transform((val) => ["1", "true", "yes", "on"].includes(val.toLowerCase()))
    .pipe(z.boolean()),
});

const source = {
  WEBSITE_NAME: import.meta.env.VITE_WEBSITE_NAME,
  WEBSITE_VERSION: import.meta.env.VITE_WEBSITE_VERSION,
  WEBSITE_DESCRIPTION: import.meta.env.VITE_WEBSITE_DESCRIPTION,
  ENV: import.meta.env.VITE_ENV,
  SERVER_URL: import.meta.env.VITE_SERVER_URL,
  SERVER_BASE_PATH: import.meta.env.VITE_SERVER_BASE_PATH,
  SERVER_PUBLIC_KEY: import.meta.env.VITE_SERVER_PUBLIC_KEY,
  SERVER_LOGGING: import.meta.env.VITE_SERVER_LOGGING,
  SERVER_TIMEOUT: import.meta.env.VITE_SERVER_TIMEOUT,
  SERVER_RETRY_COUNT: import.meta.env.VITE_SERVER_RETRY_COUNT,
  SERVER_NEED_HEADER_WHILE_REQUEST: import.meta.env.VITE_SERVER_NEED_HEADER_WHILE_REQUEST,
} as const;

const { success, data, error } = schema.safeParse(source);


export type envSchema = z.infer<typeof schema>;
export const env = DeepFreeze<envSchema | null>(
  success
    ? {
        WEBSITE_NAME: data.WEBSITE_NAME as string,
        WEBSITE_VERSION: data.WEBSITE_VERSION as string,
        WEBSITE_DESCRIPTION: data.WEBSITE_DESCRIPTION as string,
        ENV: data.ENV as "Development" | "Staging" | "Production",
        SERVER_URL: data.SERVER_URL as string,
        SERVER_BASE_PATH: data.SERVER_BASE_PATH as string,
        SERVER_PUBLIC_KEY: data.SERVER_PUBLIC_KEY as string,
        SERVER_LOGGING: data.SERVER_LOGGING as boolean,
        SERVER_TIMEOUT: data.SERVER_TIMEOUT as number,
        SERVER_RETRY_COUNT: data.SERVER_RETRY_COUNT as number,
        SERVER_NEED_HEADER_WHILE_REQUEST: data.SERVER_NEED_HEADER_WHILE_REQUEST as boolean
      }
    : null
);
export const envError = success ? null : error;
export const envValid = success;
export const treeifyError = (err: z.ZodError) => z.treeifyError(err);
