import { create } from "zustand";

import type { envSchema } from "core/config/env";

interface EnvStoreState {
  env: envSchema;
  isLoaded: boolean;
  setEnv: (data: envSchema) => void;
}

export const useEnvStore = create<EnvStoreState>((set) => ({
  env: {
    WEBSITE_NAME: "",
    WEBSITE_VERSION: "",
    WEBSITE_DESCRIPTION: "",
    ENV: "Development",
    SERVER_URL: "",
    SERVER_BASE_PATH: "",
    SERVER_PUBLIC_KEY: "",
    SERVER_LOGGING: false,
    SERVER_TIMEOUT: 0,
    SERVER_RETRY_COUNT: 0,
    SERVER_NEED_HEADER_WHILE_REQUEST: false,
  },
  isLoaded: false,
  setEnv(data) {
    set((state) => {
      // Buat pengaman jika sudah diload pertama kali
      if (state.isLoaded) return { env: state.env };
      
      return { env: data, isLoaded: true };
    });
  },
}));
