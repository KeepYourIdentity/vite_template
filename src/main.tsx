import GlobalErrorBoundary from "core/assets/static/GlobalErrorBoundary";
import SystemError from "core/assets/static/SystemError";
import "core/assets/style/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "~/App.tsx";
import { env, envError, envValid, treeifyError } from "~/core/config/env";

import type { ZodError } from "zod";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Gagal menemukan elemen root. Pastikan elemen dengan id 'root' ada di HTML.");
}

const rootClassName = "h-screen min-w-full container flex flex-col font-sans select-none overflow-hidden";
const appEnv = envValid ? env : null;

if (!appEnv) {
  createRoot(root).render(
    <div className={rootClassName}>
      <SystemError
        title={"Sistem Gagal Dimuat"}
        message="Aplikasi tidak dapat berjalan karena ada kesalahan pada konfigurasi environment."
        rawError={treeifyError(envError as ZodError)}
      />
    </div>
  );
} else {
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
    </div>
  );
}
