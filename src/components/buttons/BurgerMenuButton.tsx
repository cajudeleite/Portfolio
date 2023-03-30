import { useRef, useState } from "react";
import UseAnimations from "react-useanimations";
import menu4 from "react-useanimations/lib/menu4";
import { RoutePath, routerElements } from "../../router";
import { useDarkMode } from "../../stores/darkModeStore";
import DarkModeButton from "./DarkModeButton";

const BurgerMenuButton = ({
  navigate,
}: {
  navigate: (route: RoutePath) => void;
}) => {
  const { darkMode } = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState<boolean | null>(null);
  const burgerRef = useRef<HTMLDivElement | null>(null);

  const handleButtonClick = (path: RoutePath) => {
    const button = burgerRef.current?.children[0];
    (button as HTMLElement).click();
    navigate(path);
  };

  return (
    <div className="md:hidden">
      <div
        className={`absolute top-0 right-0 h-screen flex flex-col items-end pt-16 pb-4 pl-12 pr-6 bg-primary text-light ${
          sidebarOpen
            ? "slide-in-right"
            : sidebarOpen === false
            ? "slide-out-right"
            : "hidden"
        }`}
      >
        {Object.entries(routerElements).map(([path, { title }]) => {
          if (title)
            return (
              <button
                key={path}
                onClick={() => {
                  handleButtonClick(path as RoutePath);
                }}
                className="text-xl font-exan"
              >
                {title}
              </button>
            );
        })}
        <div className="flex-grow" />
        <DarkModeButton />
      </div>
      <div ref={burgerRef} className="cursor-pointer">
        <UseAnimations
          animation={menu4}
          size={42}
          strokeColor={!darkMode && !sidebarOpen ? "#093361" : "#ecece8"}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
    </div>
  );
};

export default BurgerMenuButton;
