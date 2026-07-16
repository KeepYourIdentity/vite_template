import { create } from "zustand";

export interface InternetState {
  isLost: boolean;
  setIsLost: (condition: boolean) => void;
}

export const useInternet = create<InternetState>((set) => ({
  isLost: false,
  setIsLost(condition) {
    set({ isLost: condition });
  },
}));
