// biome-ignore assist/source/organizeImports: sorter conflict, cause with `@` sign handlers of each sorter
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const rawEnv = String(env.VITE_ENV || "Development")
    .trim()
    .replace(/^['"]|['"]$/g, "");
  const isProduction = rawEnv === "Production";

  return {
    plugins: [
      react(),
      tailwindcss(),
      ViteImageOptimizer({
        jpeg: { quality: 70 },
        jpg: { quality: 70 },
        png: { quality: 70 },
        // Mengonversi otomatis ke format modern WebP/AVIF jika diinginkan
        webp: { lossless: true },
        // Tambahan untuk membersihkan file SVG dari metadata desain
        svg: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  cleanupIds: false, // Penting agar animasi / referensi ID SVG di React tidak rusak
                },
              },
            },
          ],
        },
      }),
    ],
    server: {
      allowedHosts: [
        ".ngrok-free.app",
        ".ngrok-free.dev",
        ".free.pinggy.link",
        ".run.pinggy-free.link",
        ".trycloudflare.com",
      ],
      watch: {
        ignored: ["temp/*"],
        usePolling: true,
        interval: 100,
      },
      host: !isProduction,
      hmr: {
        overlay: false,
      },
    },
    build: {
      rolldownOptions: {
        external: [
          fileURLToPath(new URL("./src/mocks", import.meta.url)),
          fileURLToPath(new URL("./src/features/Development", import.meta.url)),
          fileURLToPath(new URL("./src/features/development", import.meta.url)),
        ],
      },
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
        core: path.resolve(__dirname, "./src/core"),
        features: path.resolve(__dirname, "./src/features"),
      },
    },
  };
});
