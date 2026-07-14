import { DeepFreeze } from "core/utils";
import { toast } from "react-toastify";

import type { Id, ToastOptions, UpdateOptions } from "react-toastify";

interface ToastPromiseMessages {
  pending?: string;
  success?: string;
  error?: string;
}

type ToastType = "success" | "error" | "warn" | "info" | "loading";
type ToastContainer = (msg: string, opt?: ToastOptions) => Id;

const DEFAULT_TOAST_CONFIG = DeepFreeze<ToastOptions>({
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
});

const mergeOptions = <T = ToastOptions>(opt?: T): T =>
  opt ? ({ ...DEFAULT_TOAST_CONFIG, ...opt } as T) : ({ ...DEFAULT_TOAST_CONFIG } as T);
const notify = (type: ToastType, msg: string, opt?: ToastOptions): Id => toast[type](msg, mergeOptions(opt));

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
export const _Active = (id: Id): boolean => toast.isActive(id);
export const _Promise = <T>(
  promise: Promise<T> | (() => Promise<T>),
  msg: ToastPromiseMessages,
  opt?: ToastOptions
): Promise<T> =>
  toast.promise(
    promise,
    {
      pending: msg.pending || "Loading...",
      success: msg.success || "Done!",
      error: msg.error || "Error!",
    },
    mergeOptions(opt)
  ) as Promise<T>;
