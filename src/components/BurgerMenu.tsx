import { useEffect } from "react";
import { RoutePath, routerElements } from "../types/router";
import SettingsButton from "./buttons/SettingsButton";

const BurgerMenu = ({
  burgerRef,
  navigate,
}: {
  burgerRef: HTMLDivElement;
  navigate: (route: RoutePath) => void;
}) => {
  const button = burgerRef.children[0];

  useEffect(() => {
    window.addEventListener("resize", closeSideBarOnResize, false);
  }, []);

  const closeSideBar = () => (button as HTMLElement).click();

  const closeSideBarOnResize = () => {
    if (window.innerWidth >= 768) {
      closeSideBar();
      window.removeEventListener("resize", closeSideBarOnResize);
    }
  };

  const handleButtonClick = (path: RoutePath) => {
    closeSideBar();
    navigate(path);
  };

  return (
    <>
      {Object.entries(routerElements).map(([path, { title }]) => {
        if (title)
          return (
            <button
              key={path}
              onClick={() => {
                handleButtonClick(path as RoutePath);
              }}
              className="text-xl font-exan first:mt-12"
            >
              {title}
            </button>
          );
      })}
      <div className="flex-grow" />
      <SettingsButton color="#ecece8" />
    </>
  );
};

export default BurgerMenu;
