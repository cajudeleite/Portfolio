import { RoutePath, routerElements } from "../router";
import SettingsButton from "./buttons/SettingsButton";

const BurgerMenu = ({
  burgerRef,
  navigate,
}: {
  burgerRef: HTMLDivElement;
  navigate: (route: RoutePath) => void;
}) => {
  const handleButtonClick = (path: RoutePath) => {
    const button = burgerRef.children[0];
    (button as HTMLElement).click();
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
