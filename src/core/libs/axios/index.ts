export * from "./config";

export type * from "./config";

import { _Up } from "core/libs/react-toastify";
import { instance } from "./interceptor";

import type { AxiosRequestConfig } from "axios";
import type { Id, ToastOptions, UpdateOptions } from "react-toastify";
import type { ResponseSchemaKey } from "./config";

type BodyMethod = "post" | "put" | "patch";
type QueryMethod = "get" | "delete";
type HttpMethod = BodyMethod | QueryMethod;
// type QueryFunction = <TResponse, TBody = unknown>(url: string, config1?: AxiosRequestConfig<TBody>, config2?: AxiosRequestConfig<TBody>, toastId?: Id | false, toastConfig?: ToastOptions | UpdateOptions) => Promise<ResponseSchemaKey<TResponse>>;
// type BodyFunction = <TResponse, TBody = unknown>(url: string, config1?: TBody, config2?: AxiosRequestConfig<TBody>, toastId?: Id | false, toastConfig?: ToastOptions | UpdateOptions) => Promise<ResponseSchemaKey<TResponse>>;

const baseRequest = async <TResponse, TBody = unknown>(
  url: string,
  dataOrConfig: TBody,
  config: AxiosRequestConfig<TBody>,
  toastId: Id | false,
  toastConfig: ToastOptions | UpdateOptions,
  method: HttpMethod
): Promise<ResponseSchemaKey<TResponse>> => {
  const hasToast = toastId !== false;

  try {
    let res: ResponseSchemaKey<TResponse>;

    if (["post", "patch", "put"].includes(method)) {
      res = await (instance[method as BodyMethod](url, dataOrConfig, config) as Promise<ResponseSchemaKey<TResponse>>);
    } else {
      res = await (instance[method as QueryMethod](url, {
        ...(dataOrConfig as AxiosRequestConfig<TBody>),
        ...config,
      }) as Promise<ResponseSchemaKey<TResponse>>);
    }

    if (hasToast) {
      _Up(toastId, {
        type: "success",
        render: res.message ?? "Berhasil mendapatkan data",
        isLoading: false,
        autoClose: 3000,
        ...toastConfig,
      });
    }

    return res;
  } catch (e: unknown) {
    const err = e as ResponseSchemaKey<TResponse>;

    if (hasToast) {
      _Up(toastId, {
        type: "error",
        render: err.message ?? "Gagal mendapatkan data",
        isLoading: false,
        autoClose: 3000,
        ...toastConfig,
      });
    }

    return Promise.reject(err);
  }
};

// export const get: QueryFunction = (url, config1 = {}, config2 = {}, toastId = false, toastConfig = {}) => baseRequest(url, config1 as TBody, config2, toastId, toastConfig, "get");

export function _get<TResponse, TBody = unknown>(
  url: string,
  config1: AxiosRequestConfig<TBody> = {},
  config2: AxiosRequestConfig<TBody> = {},
  toastId: Id | false = false,
  toastConfig: ToastOptions | UpdateOptions = {}
) {
  return baseRequest<TResponse, TBody>(url, config1 as TBody, config2, toastId, toastConfig, "get");
}

export function _post<TResponse, TBody = unknown>(
  url: string,
  config1: TBody = {} as TBody,
  config2: AxiosRequestConfig<TBody> = {},
  toastId: Id | false = false,
  toastConfig: ToastOptions | UpdateOptions = {}
) {
  return baseRequest<TResponse, TBody>(url, config1, config2, toastId, toastConfig, "post");
}

export function _put<TResponse, TBody = unknown>(
  url: string,
  config1: TBody = {} as TBody,
  config2: AxiosRequestConfig<TBody> = {},
  toastId: Id | false = false,
  toastConfig: ToastOptions | UpdateOptions = {}
) {
  return baseRequest<TResponse, TBody>(url, config1, config2, toastId, toastConfig, "put");
}

export function _patch<TResponse, TBody = unknown>(
  url: string,
  config1: TBody = {} as TBody,
  config2: AxiosRequestConfig<TBody> = {},
  toastId: Id | false = false,
  toastConfig: ToastOptions | UpdateOptions = {}
) {
  return baseRequest<TResponse, TBody>(url, config1, config2, toastId, toastConfig, "patch");
}

export function _delete<TResponse, TBody = unknown>(
  url: string,
  config1: AxiosRequestConfig<TBody> = {},
  config2: AxiosRequestConfig<TBody> = {},
  toastId: Id | false = false,
  toastConfig: ToastOptions | UpdateOptions = {}
) {
  return baseRequest<TResponse, TBody>(url, config1 as TBody, config2, toastId, toastConfig, "delete");
}

