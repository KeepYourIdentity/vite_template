import { _Dismiss, _Err, _Pass, _Pending, _Up } from "core/libs/react-toastify";
import { DeepThawed, local, session } from "core/utils";
import md5 from "md5";
import { handleRedacted, requestRedactedLogs } from "./config";
import { BASE_ENDPOINT, getToastId, instance, NEED_HEADER, needLog, SECRET_KEY } from "./instance";
import { canonicalStringify, generateSignature, logout } from "./utility";

import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import type {
  BodyRedactedKey,
  CustomAxiosRequestConfig,
  HeaderRedactedKey,
  ResponseCodeKey,
  ResponseSchemaKey,
} from "./config";

const fallback_msg = "Terdapat kesalahan Sistem, Hubungi Pengembang Untuk Pemeriksaan Lebih Lanjut";

instance.interceptors.request.use(
  async (conf: CustomAxiosRequestConfig) => {
    const method = conf?.method?.toUpperCase() ?? "GET";
    const params = conf?.params;
    const path = conf?.url ?? "";
    const queryString = [""];

    if (params) {
      queryString.push("?");
      const sortedParams = Object.keys(params)
        .sort()
        .reduce<Record<string, string>>((obj, key) => {
          obj[key] = String(params[key]);
          return obj;
        }, {});
      queryString.push(new URLSearchParams(sortedParams).toString());
    }

    const fullPath = path.startsWith("http")
      ? path + queryString.join("")
      : BASE_ENDPOINT() + path + queryString.join("");

    if (NEED_HEADER()) {
      /** @deprecated support until an unspecified time limit */
      const token: string = session.get("sessionToken") || local.get("sessionToken") || "";

      const timestamp = Date.now().toString();
      const reference = md5(timestamp);
      const body = conf?.data ?? {};
      const bodyStr = canonicalStringify(body);
      const payload = `${method}:${fullPath}:${timestamp}:${reference}:${bodyStr}`;
      const signature = await generateSignature(payload, SECRET_KEY());

      if (token.trim().length > 0) {
        conf.headers.authorization = token.startsWith("Bearer ") ? token : `Bearer ${token.trim()}`;
        conf.headers.Authorization = token.startsWith("Bearer ") ? token : `Bearer ${token.trim()}`;
      }
      conf.headers["x-timestamp"] = timestamp;
      conf.headers["x-reference"] = reference;
      conf.headers["x-signature"] = signature;
    }

    if (conf._toast === true) conf._toastId = _Pending("Memuat...", { toastId: getToastId() });

    if (needLog()) {
      const { headers, baseURL, data: body = {} } = conf as AxiosRequestConfig;
      const mergePath = fullPath.startsWith("http")
        ? fullPath
        : `${baseURL?.endsWith(BASE_ENDPOINT()) ? baseURL.replace(BASE_ENDPOINT(), "") : baseURL}${fullPath}`;
      const headersToParse: Record<string, unknown> = { ...headers };
      const bodyToParse: Record<string, unknown> = { ...body };

      handleRedacted<HeaderRedactedKey>(headersToParse, DeepThawed(requestRedactedLogs.headers));
      handleRedacted<BodyRedactedKey>(bodyToParse, DeepThawed(requestRedactedLogs.data));

      // for (const key of Object.keys(headersToParse)) {
      //   if (requestRedactedLogs.headers.includes(key as HeaderRedactedKey)) headersToParse[key] = "[REDACTED]";
      // }

      // for (const key of Object.keys(bodyToParse)) {
      //   if (requestRedactedLogs.data.includes(key as BodyRedactedKey)) bodyToParse[key] = "[REDACTED]";
      // }

      console.group("🚀 Sending Request");
      console.info("URL:", mergePath);
      console.info("Method:", method);
      console.info("Headers:", JSON.stringify(headersToParse, null, 2));
      console.info("Data:", JSON.stringify(bodyToParse, null, 2));
      console.groupEnd();
    }
    return conf;
  },

  (err: AxiosError<ResponseSchemaKey<undefined>>) => {
    const conf = err.config as CustomAxiosRequestConfig;
    if (conf._toast) {
      if (conf._toastId !== undefined) {
        _Up(conf._toastId, {
          render: err.response?.data?.message ?? err.message ?? fallback_msg,
          type: "error",
          isLoading: false,
        });
      } else {
        _Dismiss(conf._toastId);
        _Err(err.response?.data?.message ?? err.message ?? fallback_msg);
      }
    }

    if (needLog()) {
      console.group("❌ Error Before Sending");
      console.log("no-implemented-yet");
      console.groupEnd();
    }

    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  // biome-ignore lint/suspicious/noTsIgnore: <lorem>
  //@ts-ignore
  (res: AxiosResponse<ResponseSchemaKey, ResponseSchemaKey>) => {
    // FIXME: isu missing padahal tidak ada yang penting dari yang missing tadi
    const conf = res.config as CustomAxiosRequestConfig;
    const data = res.data as ResponseSchemaKey; // FIXME: isu missing setelah nambah `as ResponseSchemaKey` dibaris yang sama dengan komentar ini

    if (conf._toast) {
      if (conf._toastId !== undefined) {
        _Up(conf._toastId, {
          render: data.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        _Dismiss(conf._toastId);
        _Pass(data.message, { isLoading: false, autoClose: 2000 });
      }
    }

    if (needLog()) {
      const baseURL = conf.baseURL ?? "";
      const url = conf.url ?? "";
      const method = conf.method?.toUpperCase() ?? "GET";
      const headers = conf.headers ?? {};
      const params = conf.params;
      const body: Record<string, unknown> = JSON.parse(String(conf.data ?? "{}")) ?? {};
      const mergePath = String(url.startsWith("http") ? url : `${baseURL}${url}`).split("?");
      const headersToParse: Record<string, unknown> = { ...headers };
      const bodyToParse: Record<string, unknown> = { ...body };

      if (params) {
        mergePath.push("?");
        const sortedParams = Object.keys(params)
          .sort()
          .reduce<Record<string, string>>((obj, key) => {
            obj[key] = String(params[key]);
            return obj;
          }, {});
        mergePath.push(new URLSearchParams(sortedParams).toString());
      }

      handleRedacted<HeaderRedactedKey>(headersToParse, DeepThawed(requestRedactedLogs.headers));
      handleRedacted<BodyRedactedKey>(bodyToParse, DeepThawed(requestRedactedLogs.data));

      // for (const key of Object.keys(headersToParse)) {
      //   if (requestRedactedLogs.headers.includes(key as HeaderRedactedKey)) headersToParse[key] = "[REDACTED]";
      // }

      // for (const key of Object.keys(bodyToParse)) {
      //   if (requestRedactedLogs.data.includes(key as BodyRedactedKey)) bodyToParse[key] = "[REDACTED]";
      // }

      console.group("✅ Receive Response");
      console.info("Status:", String(res.status));
      console.info("Address:", mergePath.join(""));
      console.info("Method:", method);
      console.info("Headers:", JSON.stringify(headersToParse, null, 2));
      console.info("Params:", JSON.stringify(params));
      console.info("Data:", JSON.stringify(bodyToParse, null, 2));
      console.info("Response data:", JSON.stringify({ ...data }));
      console.groupEnd();
    }

    return data;
  },

  async (err: AxiosError<ResponseSchemaKey<undefined>>) => {
    const conf = err.config as CustomAxiosRequestConfig;
    const httpStatus = err.response?.status ?? 500;

    const isCanceled = ["ERR_CANCELED"].includes(err?.code ?? "") || ["CanceledError"].includes(err.name);

    const rawData = err.response?.data as Partial<ResponseSchemaKey<undefined>> | undefined;
    const data: ResponseSchemaKey<undefined> = {
      status: rawData?.status ?? false,
      responseCode: isCanceled ? "00" : (rawData?.responseCode ?? "50"),
      message: isCanceled ? "Permintaan dibatalkan oleh pengguna" : (rawData?.message ?? err.message ?? fallback_msg),
    };

    if (needLog()) {
      const baseURL = conf.baseURL ?? "";
      const url = conf.url ?? "";
      const method = conf.method?.toUpperCase() ?? "GET";
      const headers = conf.headers ?? {};
      const params = conf.params;
      const body: Record<string, unknown> = JSON.parse(String(conf.data ?? "{}")) ?? {};
      const mergePath = String(url.startsWith("http") ? url : `${baseURL}${url}`).split("?");
      const headersToParse: Record<string, unknown> = { ...headers };
      const bodyToParse: Record<string, unknown> = { ...body };

      if (params) {
        mergePath.push("?");
        const sortedParams = Object.keys(params)
          .sort()
          .reduce<Record<string, string>>((obj, key) => {
            obj[key] = String(params[key]);
            return obj;
          }, {});
        mergePath.push(new URLSearchParams(sortedParams).toString());
      }

      handleRedacted<HeaderRedactedKey>(headersToParse, DeepThawed(requestRedactedLogs.headers));
      handleRedacted<BodyRedactedKey>(bodyToParse, DeepThawed(requestRedactedLogs.data));

      // for (const key of Object.keys(headersToParse)) {
      //   if (requestRedactedLogs.headers.includes(key as HeaderRedactedKey)) headersToParse[key] = "[REDACTED]";
      // }

      // for (const key of Object.keys(bodyToParse)) {
      //   if (requestRedactedLogs.data.includes(key as BodyRedactedKey)) bodyToParse[key] = "[REDACTED]";
      // }

      console.group("❌ Receive Error");
      console.error("Status:", httpStatus, err.response?.statusText ?? "Internal Server Error");
      console.error("URL:", mergePath.join(""));
      console.error("Method:", method);
      console.error("Headers:", JSON.stringify(headersToParse, null, 2));
      console.error("Params:", JSON.stringify(params));
      console.error("Body:", JSON.stringify(bodyToParse, null, 2));
      console.error("Response:", JSON.stringify(data));
      console.groupEnd();
    }

    // Toast Conf
    if (conf._toast) {
      if (httpStatus === 401) {
        _Dismiss(conf._toastId);
      } else {
        if (conf._toastId !== undefined) {
          if (isCanceled) {
            _Dismiss(conf._toastId);
          }
          _Up(conf._toastId, {
            render: data.message,
            type: "error",
            isLoading: false,
          });
        } else {
          _Dismiss(conf._toastId);
          if (!isCanceled) {
            _Err(data.message, { isLoading: false });
          }
        }
      }
    }

    // FIX: pengecekan endpoint "/logout" sebelumnya duplikat (satu di sini, satu lagi
    // di dalam blok 401). Blok kedua tidak pernah tercapai karena blok ini sudah
    // return duluan untuk semua request ke endpoint "/logout". Cukup satu kali di sini.
    if (typeof conf.url === "string" && conf.url.endsWith("/logout")) {
      return Promise.resolve<ResponseSchemaKey<undefined>>({
        status: true,
        responseCode: "00",
        message: "Logged Out",
      });
    }

    if (
      httpStatus === 401 &&
      ["02", "03"].includes(data.responseCode as ResponseCodeKey) &&
      typeof conf.url === "string" &&
      !conf.url.endsWith("/login")
    ) {
      await logout({ callApi: true });
      window.location.href = "/login";
      return Promise.resolve();
    }

    return Promise.reject<ResponseSchemaKey<undefined>>(data);
  }
);

export { instance };

