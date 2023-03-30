import UseAnimations from "react-useanimations";
import menu4 from "react-useanimations/lib/menu4";
import { useDarkMode } from "../../stores/darkModeStore";

const BurgerMenuButton = () => {
  const { darkMode } = useDarkMode();
  return (
    <UseAnimations
      animation={menu4}
      size={42}
      strokeColor={darkMode ? "#ecece8" : "#093361"}
    />
  );
};

export default BurgerMenuButton;
