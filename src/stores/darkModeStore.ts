import create from "zustand";

interface DarkModeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const rootDiv = document.getElementById("root") as HTMLDivElement;

export const useDarkMode = create<DarkModeState>((set) => ({
  darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));
