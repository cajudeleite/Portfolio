import { useLayoutEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const App = () => {
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
    <div className="">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={toggleDarkMode}>Toggle dark mode</button>
        <p>Mode: {darkMode ? "dark" : "light"}</p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
};

export default App;
