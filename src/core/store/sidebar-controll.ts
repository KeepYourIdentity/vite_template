import { create } from "zustand";

export interface SidebarControllState {
  isSidebarOpen: boolean;
  isSidebarShow: boolean;
  toggleSidebarOpen: (condition?: boolean | "DEFAULT") => void;
  toggleSidebarShow: (condition: boolean) => void;
}

export const useSidebarControll = create<SidebarControllState>((set) => ({
  isSidebarOpen: false,
  isSidebarShow: true,
  toggleSidebarOpen: (condition = "DEFAULT") => {
    set((state) => ({ isSidebarOpen: condition === "DEFAULT" ? !state.isSidebarOpen : condition }));
  },
  toggleSidebarShow: (condition: boolean) => {
    set(() => ({ isSidebarShow: condition }));
  },
}));
