import create from "zustand";

interface DarkModeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useDarkMode = create<DarkModeState>((set) => ({
  darkMode:
    "theme" in localStorage
      ? localStorage.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches,
  toggleDarkMode: () =>
    set((state) => {
      localStorage.setItem("theme", !state.darkMode ? "dark" : "light");
      return { darkMode: !state.darkMode };
    }),
}));
