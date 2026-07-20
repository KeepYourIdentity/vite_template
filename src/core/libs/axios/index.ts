import { _Dismiss, _Up } from "core/libs/react-toastify";
import { instance } from "./interceptor";

import type { AxiosRequestConfig } from "axios";
import type { Id, ToastOptions, UpdateOptions } from "react-toastify";
import type { CustomAxiosRequestConfig, ResponseSchemaKey } from "./config";

type BodyMethod = "post" | "put" | "patch";
type QueryMethod = "get" | "delete";
type HttpMethod = BodyMethod | QueryMethod;

/**
 * Melakukan HTTP request dengan dua mode toast (pilih salah satu, jangan dua-duanya):
 *
 * 1. **Mode Otomatis** — set `config._toast = true` pada `config1`/`config2`.
 *    Toast pending/success/error sepenuhnya di-handle oleh interceptor.
 *    Jangan kirim parameter `toastId`.
 *
 * 2. **Mode Manual** — buat toast sendiri via `_Pending(...)` sebelum memanggil,
 *    lalu kirim `Id` hasilnya sebagai parameter `toastId`. Interceptor tidak akan
 *    ikut campur (asalkan `config._toast` tidak di-set true).
 *
 * ⚠️ Menggunakan keduanya sekaligus akan menghasilkan toast ganda.
 */
const baseRequest = async <TResponse, TBody = unknown>(
  url: string,
  dataOrConfig: TBody,
  config: AxiosRequestConfig<TBody>,
  toastId: Id | false,
  toastConfig: ToastOptions | UpdateOptions,
  method: HttpMethod
): Promise<ResponseSchemaKey<TResponse>> => {
  const hasToast = toastId !== false && !(config as CustomAxiosRequestConfig)._toast;

  try {
    let res: ResponseSchemaKey<TResponse> | undefined;

    if (["post", "patch", "put"].includes(method)) {
      res = await (instance[method as BodyMethod](url, dataOrConfig, config) as Promise<ResponseSchemaKey<TResponse>>);
    } else {
      res = await (instance[method as QueryMethod](url, {
        ...(dataOrConfig as AxiosRequestConfig<TBody>),
        ...config,
      }) as Promise<ResponseSchemaKey<TResponse>>);
    }

    if (hasToast && res) {
      _Up(toastId, {
        type: "success",
        render: res.message ?? "Berhasil mendapatkan data",
        isLoading: false,
        autoClose: 3000,
        ...toastConfig,
      });
    }

    return res as ResponseSchemaKey<TResponse>;
  } catch (e: unknown) {
    const err = e as ResponseSchemaKey<TResponse>;
    const isCanceled = err?.responseCode === "00" && err?.message === "Permintaan dibatalkan oleh pengguna";

    if (hasToast) {
      if (isCanceled) {
        // Selaras dengan perilaku interceptor: request yang di-cancel user tidak
        // perlu toast error, cukup hilangkan toast pending-nya secara diam-diam.
        _Dismiss(toastId as Id);
      } else {
        _Up(toastId, {
          type: "error",
          render: err?.message ?? "Gagal mendapatkan data",
          isLoading: false,
          autoClose: 3000,
          ...toastConfig,
        });
      }
    }

    return Promise.reject(err);
  }
};

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
