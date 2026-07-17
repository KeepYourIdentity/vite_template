export * from "./config";

export type * from "./config";

import { toast } from "react-toastify";
import { mergeOptions, notify } from "./";

import type { Id, ToastOptions, ToastPromiseParams, UpdateOptions } from "react-toastify";
import type { ToastContainer } from "./";

export const _Pass: ToastContainer = (msg, opt) => notify("success", msg, opt);
export const _Err: ToastContainer = (msg, opt) => notify("error", msg, opt);
export const _Warn: ToastContainer = (msg, opt) => notify("warn", msg, opt);
export const _Info: ToastContainer = (msg, opt) => notify("info", msg, opt);
export const _Pending: ToastContainer = (msg, opt) => notify("loading", msg, opt);
export const _Up = (id: Id, opt?: UpdateOptions): void => {
  toast.update(id, mergeOptions<UpdateOptions>(opt));
};
export const _Dismiss = (id?: Id): void => {
  toast.dismiss(id);
};
export const _Active = (id: Id, containerId?: Id): boolean => toast.isActive(id, containerId);
export const _Promise = <T = unknown, E = unknown, P = unknown>(
  promise: Promise<T> | (() => Promise<T>),
  msg: ToastPromiseParams<T, E, P>,
  opt?: ToastOptions<T>
): Promise<T> =>
  toast.promise<T, E, P>(
    promise,
    {
      pending: msg.pending || "Please Wait...",
      success: msg.success || "Resolved!",
      error: msg.error || "Rejected!",
    },
    mergeOptions(opt)
  );
