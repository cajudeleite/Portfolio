import MoonIcon from "../../assets/icons/MoonIcon";
import SunIcon from "../../assets/icons/SunIcon";
import useDarkMode from "../../stores/darkModeStore";

const DarkModeButton = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="relative h-8 hover:scale-125 transform-gpu transition duration-200 ease-in"
    >
      <SunIcon
        className={`transform-gpu transition-opacity duration-300 ${
          darkMode ? "opacity-100" : "opacity-0"
        }`}
      />
      <MoonIcon
        className={`absolute top-0 transform-gpu transition-opacity duration-300 ${
          darkMode ? "opacity-0" : "opacity-100"
        }`}
      />
    </button>
  );
};

export default DarkModeButton;
