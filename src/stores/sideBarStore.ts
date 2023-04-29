import { create } from "zustand";

type SideBarStore = {
  isOpen: boolean;
  setSideBarOpen: (open: boolean) => void;
  children: JSX.Element | null;
  setChildren: (children: JSX.Element | null) => void;
};

const useSideBar = create<SideBarStore>((set) => ({
  isOpen: false,
  setSideBarOpen: (open) => set(() => ({ isOpen: open })),
  children: null,
  setChildren: (children) => set({ children }),
}));

export default useSideBar;
