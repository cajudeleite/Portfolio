import create from "zustand";

interface DarkModeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const useDarkMode = create<DarkModeState>((set) => ({
  darkMode:
    "theme" in localStorage
      ? localStorage.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches,
  toggleDarkMode: () =>
    set((state) => {
      localStorage.setItem("theme", state.darkMode ? "light" : "dark");
      return { darkMode: !state.darkMode };
    }),
}));

export default useDarkMode;
