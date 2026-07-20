import { DeepFreeze } from "core/utils";
import { toast } from "react-toastify";

import type { Id, ToastOptions } from "react-toastify";

export type ToastType = "success" | "error" | "warn" | "info" | "loading";
export type ToastContainer = (msg: string, opt?: ToastOptions) => Id;

export const DEFAULT_TOAST_CONFIG = DeepFreeze<ToastOptions>({
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
});

export const mergeOptions = <T = ToastOptions>(opt?: T): T =>
  opt ? ({ ...DEFAULT_TOAST_CONFIG, ...opt } as T) : ({ ...DEFAULT_TOAST_CONFIG } as T);
export const notify = (type: ToastType, msg: string, opt?: ToastOptions): Id => toast[type](msg, mergeOptions(opt));
