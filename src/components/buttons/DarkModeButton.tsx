import { useLayoutEffect, useState } from "react";
import MoonIcon from "../../assets/icons/MoonIcon";
import SunIcon from "../../assets/icons/SunIcon";

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(false);
  const rootDiv = document.getElementById("root") as HTMLDivElement;

  useLayoutEffect(() => {
    const preferedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const localTheme = "theme" in localStorage && localStorage.theme === "dark";
    const darkTheme = localTheme || preferedTheme;

    setDarkMode(darkTheme);
    if (darkTheme) rootDiv.classList.add("dark");
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
    rootDiv.classList.toggle("dark");
  };

  return (
    <button onClick={toggleDarkMode} className="relative hover:scale-125 transform-gpu transition duration-200 ease-in">
      <SunIcon className={`transform-gpu transition-opacity duration-300 ${darkMode ? "opacity-100" : "opacity-0"}`} />
      <MoonIcon className={`absolute top-0 transform-gpu transition-opacity duration-300 ${darkMode ? "opacity-0" : "opacity-100"}`} />
    </button>
  );
};

export default DarkModeButton;
