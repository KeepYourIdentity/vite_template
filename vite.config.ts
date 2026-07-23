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
        webp: { lossless: true },
        svg: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  cleanupIds: false,
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
      proxy: {
        "/api": {
          target: "http://192.168.200.169:6080", // change this following backend api address
          changeOrigin: true,
        },
      },
    },
    build: {
      rolldownOptions: {
        external: [
          fileURLToPath(new URL("./src/features/mocks", import.meta.url)),
          fileURLToPath(new URL("./src/features/ui/development", import.meta.url)),
        ],
      },
    },
    resolve: {
      alias: {
        core: path.resolve(__dirname, "./src/core"),
        features: path.resolve(__dirname, "./src/features"),
        main: path.resolve(__dirname, "./src/features/main"),
        mocks: path.resolve(__dirname, "./src/features/mocks"),
        routes: path.resolve(__dirname, "./src/features/routes"),
        ui: path.resolve(__dirname, "./src/features/ui"),
        utils: path.resolve(__dirname, "./src/features/utils"),
      },
    },
  };
});
