import { useInternet } from "core/store";
import { DeepFreeze } from "core/utils";
import { z } from "zod";

import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { AxiosRetry } from "axios-retry";
import type { DeepReadonly } from "core/utils";
import type { Id } from "react-toastify";

const rawSessionStorageList = ["sessionToken", "sessionDevice", "sessionURL"] as const;
const rawLocalStorageList = ["localToken", "localMenu", "localRole"] as const;
const rawHeaderRedactedList = [
  "Authorization",
  "X-timestamp",
  "X-reference",
  "X-signature",
  "authorization",
  "x-timestamp",
  "x-reference",
  "x-signature",
] as const;
const rawBodyRedactedList = [
  "password",
  "newPassword",
  "confirmPassword",
  "oldPassword",
  "passwordConfirmation",
  "password_confirmation",
] as const;

/**
 * Daftar response code bisnis, berdasarkan dokumentasi berikut:
 *
 * === GENERAL ===
 * 00 | Success
 * 01 | Invalid Request
 * 02 | Unauthorized
 * 03 | Forbidden
 * 04 | Data Not Found
 * DT | Duplicate Data
 *
 * === SYSTEM ERROR ===
 * 50 | Internal Server Error
 * 51 | Service Maintenance
 * 52 | Service Unavailable
 * 53 | Internal Server Missconfigure
 * 99 | Undefined Error
 *
 * === EXTERNAL SERVICE ERROR ===
 * X50 | External Service Error
 * X51 | External Service Maintenance
 * X52 | External Service Unavailable
 * X53 | External Service Invalid Response
 */
const rawResponseCodeList = [
  "EXIT",
  "00",
  "01",
  "02",
  "03",
  "04",
  "DT",
  "50",
  "51",
  "52",
  "53",
  "99",
  "X50",
  "X51",
  "X52",
  "X53",
] as const;

/**
 * Kode yang layak di-retry: hanya kondisi *transient* dimana request yang sama
 * berpeluang berhasil kalau dicoba ulang setelah jeda (server maintenance / overload).
 *
 * Sengaja TIDAK termasuk:
 * - 00/01/02/03/04/DT  -> hasil bisnis pasti, retry tidak akan mengubah apa pun
 * - 50/99               -> biasanya indikasi bug, retry percuma (fail-fast)
 * - 53/X53              -> misconfigure / invalid response, tidak akan berubah walau di-retry
 * - X50                 -> error dari layanan eksternal yang sifatnya final, bukan transient
 */
const rawRetryableResponseCodeList = ["51", "52", "X51", "X52"] as const;

export const SessionStorageSchema = z.enum(rawSessionStorageList);
export const LocalStorageSchema = z.enum(rawLocalStorageList);
export const HeaderRedactedSchema = z.enum(rawHeaderRedactedList);
export const BodyRedactedSchema = z.enum(rawBodyRedactedList);
export const ResponseCodeSchema = z.enum(rawResponseCodeList);
export const RetryableResponseCodeSchema = z.enum(rawRetryableResponseCodeList);

export type SessionStorageKey = z.infer<typeof SessionStorageSchema>;
export type LocalStorageKey = z.infer<typeof LocalStorageSchema>;
export type HeaderRedactedKey = z.infer<typeof HeaderRedactedSchema>;
export type BodyRedactedKey = z.infer<typeof BodyRedactedSchema>;
export type ResponseCodeKey = z.infer<typeof ResponseCodeSchema>;
export type RetryableResponseCodeKey = z.infer<typeof RetryableResponseCodeSchema>;

export interface RequestRedactedLogsKey {
  headers: HeaderRedactedKey[];
  data: BodyRedactedKey[];
}
export interface ResponseSchemaKey<D = unknown> {
  status: boolean;
  responseCode?: ResponseCodeKey;
  message: string;
  data?: D;
}
export interface CustomAxiosRequestConfig<D = unknown> extends InternalAxiosRequestConfig<D> {
  _toast?: boolean;
  _toastId?: Id;
}

export const sessionStorageList: DeepReadonly<SessionStorageKey[]> = DeepFreeze(rawSessionStorageList);
export const localStorageList: DeepReadonly<LocalStorageKey[]> = DeepFreeze(rawLocalStorageList);
export const headerRedactedList: DeepReadonly<HeaderRedactedKey[]> = DeepFreeze(rawHeaderRedactedList);
export const bodyRedactedList: DeepReadonly<BodyRedactedKey[]> = DeepFreeze(rawBodyRedactedList);
export const responseCodeList: DeepReadonly<ResponseCodeKey[]> = DeepFreeze(rawResponseCodeList);
export const retryableResponseCodeList: DeepReadonly<RetryableResponseCodeKey[]> =
  DeepFreeze(rawRetryableResponseCodeList);
export const requestRedactedLogs: DeepReadonly<RequestRedactedLogsKey> = DeepFreeze({
  headers: headerRedactedList,
  data: bodyRedactedList,
});

export const handleRetryCondition = (err: AxiosError, module: AxiosRetry): boolean => {
  const code = err.code;
  const config = err.config as CustomAxiosRequestConfig;

  if (code === "ERR_NETWORK" && !window.navigator.onLine) {
    useInternet.getState().setIsLost(true);
    return false;
  }
  if (code === "ERR_NETWORK") {
    try {
      if (!window.navigator.onLine) {
        useInternet.getState().setIsLost(true);
        return false;
      }

      // config.url bisa berupa path relatif ("/users/123"); new URL() akan throw
      // kalau tidak di-resolve dulu ke baseURL, sehingga retry ERR_NETWORK tidak
      // pernah jalan untuk request relatif.
      const rawUrl = config?.url ?? "";
      const resolvedUrl = rawUrl.startsWith("http") ? rawUrl : `${config?.baseURL ?? window.location.origin}${rawUrl}`;
      const reqOrigin = new URL(resolvedUrl).origin;
      return reqOrigin === window.location.origin;
    } catch {
      return false;
    }
  }

  if (!err.response) return module.isNetworkError(err);

  const response = err.response.data as ResponseSchemaKey<unknown>;
  const responseCode = response.responseCode;

  if (code === "ECONNABORTED") return false;
  if (!responseCode) return module.isNetworkError(err);

  // Hanya lanjut retry kalau responseCode termasuk kondisi transient yang sudah
  // ditentukan (server maintenance / unavailable). Selain itu, fail-fast.
  if (!retryableResponseCodeList.includes(responseCode as RetryableResponseCodeKey)) return false;

  return module.isNetworkError(err);
};

export const handleRedacted = <T extends string>(obj: Record<string, unknown>, redactedList: T[]): void => {
  for (const key of Object.keys(obj)) {
    if (redactedList.includes(key as T)) obj[key] = "[REDACTED]";
  }
};
