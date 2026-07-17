import { local } from "core/utils";
import { create } from "zustand";

export interface DarkThemeState {
  isDarkTheme: boolean;
  toggleDarkTheme: (val?: boolean) => void;
  initial: () => void;
}

export const useDarkTheme = create<DarkThemeState>((set) => ({
  isDarkTheme: false,

  toggleDarkTheme(val) {
    set((state) => {
      const darkThemeFlag = typeof val === "boolean" ? val : !state.isDarkTheme;

      local.remove("localDarkTheme");
      local.set<boolean>({ storage: "localDarkTheme", data: darkThemeFlag });

      return { isDarkTheme: darkThemeFlag };
    });
  },

  initial() {
    const darkThemeFlag = local.get<boolean>("localDarkTheme") || false;
    set({ isDarkTheme: darkThemeFlag });
  },
}));
