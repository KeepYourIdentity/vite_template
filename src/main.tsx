import SystemError from "core/assets/static/SystemError";
import "core/assets/style/index.css";
import { env, envError, envValid } from "core/config/env";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "~/App.tsx";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Gagal menemukan elemen root. Pastikan elemen dengan id 'root' ada di HTML.");
}

const rootClassName = "h-screen container flex flex-col font-sans select-none overflow-hidden";
const appEnv = envValid ? env : null;

if (!appEnv) {
  createRoot(root).render(
    <div className={rootClassName}>
      <SystemError errorDetails={envError} />
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

  createRoot(root).render(<div className={rootClassName}>{appContent}</div>);
}
