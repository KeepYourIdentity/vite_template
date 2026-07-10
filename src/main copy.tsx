import "core/assets/style/index.css";
import { env, envValid } from "core/config/env";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "~/App.tsx";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Gagal menemukan elemen root. Pastikan elemen dengan id 'root' ada di HTML.");
}

createRoot(root).render(
  <div className="h-screen container flex flex-col font-sans select-none overflow-hidden">
    {!envValid && <div>lorem</div>} {/* WARN: upcomming error display, don't break my plant */}
    {envValid && env?.ENV !== "Production" ? ( // Yakin selalu ada nilainya jika envValid bernilai benar
      <StrictMode>
        <App />
      </StrictMode>
    ) : (
      <App />
    )}
  </div>
);

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
