import { RoutePath, routerElements } from "../types/router";
import useDarkMode from "../stores/darkModeStore";
import SettingsButton from "./buttons/SettingsButton";

const NavBar = ({ navigate }: { navigate: (route: RoutePath) => void }) => {
  const { darkMode } = useDarkMode();

  return (
    <section className="fixed z-20 top-0 h-12 w-full flex space-x-4 justify-end py-2 px-4">
      <button onClick={() => navigate("/")} className="font-exan text-3xl">
        Caju
      </button>
      <div className="flex-grow" />
      {Object.entries(routerElements).map(([path, { title }]) => {
        if (title)
          return (
            <button
              key={path}
              onClick={() => navigate(path as RoutePath)}
              className="text-lg hidden md:block"
            >
              {title}
            </button>
          );
      })}
      <div className="hidden md:block">
        <SettingsButton color={darkMode ? "#ecece8" : "#093361"} />
      </div>
    </section>
  );
};

export default NavBar;
