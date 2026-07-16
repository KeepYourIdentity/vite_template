import ErrorUI from "core/assets/static/ErrorUI";
import GlobalErrorBoundary from "core/assets/static/GlobalErrorBoundary";
import "core/assets/style/index.css";
import { useEnvStore } from "core/store";
import App from "features/main/App";
import { AlertTriangle, CheckCircle2, CircleAlert, Info } from "lucide-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { env, envError, envValid, treeifyError } from "./env";

import type { ReactElement } from "react";
import type { IconProps, TypeOptions } from "react-toastify";
import type { ZodError } from "zod";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Gagal menemukan elemen root. Pastikan elemen dengan id 'root' ada di HTML.");
}

const rootClassName = "h-screen min-w-full container flex flex-col font-sans select-none overflow-hidden";
const appEnv = envValid ? env : null;
const customToastIcon = (props: IconProps): ReactElement | true => {
  const iconClass = "text-white size-10";
  const iconGroup: Record<TypeOptions, ReactElement | true> = {
    success: <CheckCircle2 className={iconClass} />,
    error: <CircleAlert className={iconClass} />,
    warning: <AlertTriangle className={iconClass} />,
    info: <Info className={iconClass} />,
    default: true,
  };

  return iconGroup[props.type];
};

if (!appEnv) {
  createRoot(root).render(
    <div className={rootClassName}>
      <ErrorUI
        title={"Sistem Gagal Dimuat"}
        message="Aplikasi tidak dapat berjalan karena ada kesalahan pada konfigurasi environment."
        rawError={treeifyError(envError as ZodError)}
      />
    </div>
  );
} else {
  useEnvStore.getState().setEnv(appEnv);
  const shouldUseStrictMode = appEnv.ENV !== "Production";
  const appContent = shouldUseStrictMode ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  );

  createRoot(root).render(
    <div className={rootClassName}>
      <GlobalErrorBoundary>{appContent}</GlobalErrorBoundary>
      <ToastContainer icon={customToastIcon} />
    </div>
  );
}
