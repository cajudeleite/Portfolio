import { useRef } from "react";
import UseAnimations from "react-useanimations";
import menu4 from "react-useanimations/lib/menu4";
import { RoutePath } from "../../router";
import useDarkMode from "../../stores/darkModeStore";
import useSideBar from "../../stores/sideBarStore";
import BurgerMenu from "../BurgerMenu";

const BurgerMenuButton = ({
  navigate,
}: {
  navigate: (route: RoutePath) => void;
}) => {
  const { darkMode } = useDarkMode();
  const { isOpen, setSideBarOpen, setChildren } = useSideBar();
  const burgerRef = useRef<HTMLDivElement | null>(null);

  const toggleSideBar = () => {
    if (!burgerRef.current) return;

    setChildren(
      <BurgerMenu burgerRef={burgerRef.current} navigate={navigate} />
    );
    setSideBarOpen(!isOpen);
  };

  return (
    <div
      ref={burgerRef}
      className="absolute top-2 right-4 z-40 cursor-pointer md:hidden"
    >
      <UseAnimations
        animation={menu4}
        size={42}
        strokeColor={!darkMode && !isOpen ? "#093361" : "#ecece8"}
        onClick={toggleSideBar}
      />
    </div>
  );
};

export default BurgerMenuButton;
