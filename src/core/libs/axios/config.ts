// NOTE: Merapihkan Types dan data yang masih bercampur jika diperlukan

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

export const SessionStorageSchema = z.enum(rawSessionStorageList);
export const LocalStorageSchema = z.enum(rawLocalStorageList);
export const HeaderRedactedSchema = z.enum(rawHeaderRedactedList);
export const BodyRedactedSchema = z.enum(rawBodyRedactedList);
export const ResponseCodeShema = z.enum(rawResponseCodeList);

export type SessionStorageKey = z.infer<typeof SessionStorageSchema>;
export type LocalStorageKey = z.infer<typeof LocalStorageSchema>;
export type HeaderRedactedKey = z.infer<typeof HeaderRedactedSchema>;
export type BodyRedactedKey = z.infer<typeof BodyRedactedSchema>;
export type ResponseCodeKey = z.infer<typeof ResponseCodeShema>;

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

      const reqOrigin = new URL(config?.url ?? "").origin;
      // if (reqOrigin !== window.location.origin) throw new Error();
      // return true;
      return reqOrigin === window.location.origin;
    } catch {
      return false;
    }
  }
  if (!err.response) return module.isNetworkError(err);

  const response = err.response.data as ResponseSchemaKey<unknown>;

  const responseCode: ResponseCodeKey = response.responseCode ?? "50";
  if (responseCode !== "00" || code === "ECONNABORTED") return false;
  return module.isNetworkError(err);
};

export const handleRedacted = <T extends string>(obj: Record<string, unknown>, redactedList: T[]): void => {
  for (const key of Object.keys(obj)) {
    if (redactedList.includes(key as T)) obj[key] = "[REDACTED]";
  }
};
