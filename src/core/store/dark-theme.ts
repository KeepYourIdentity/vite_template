import { create } from "zustand";

interface DarkThemeState {
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  initial: () => void;
}

export const useDarkTheme = create<DarkThemeState>((set) => ({
  isDarkTheme: false,
  toggleDarkTheme: (val?: boolean) => {
    set((state) => ({ isDarkTheme: typeof val === "boolean" ? val : !state.isDarkTheme }));
  },
  initial: () => {
    const darkThemeFlag = JSON.parse(window.localStorage.getItem("localDarkTheme") || "false") as boolean;
    set({ isDarkTheme: darkThemeFlag });
  },
}));
