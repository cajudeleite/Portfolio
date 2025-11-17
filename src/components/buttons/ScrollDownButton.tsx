import { useEffect, useState } from "react";
import UseAnimations from "react-useanimations";
import arrowDown from "react-useanimations/lib/arrowDown";
import CircularText from "../bits/CircularText";

const ScrollDownButton = ({ color, changedRoute, onScrollDown, currentRoute }: { color: string, changedRoute: boolean, onScrollDown: () => void, currentRoute: string }) => {
  const [isVisible, setIsVisible] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    setIsVisible(false);
    
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, currentRoute === "/aboutme" ? 50000 : 5000);


    return () => clearTimeout(timeout);
  }, [changedRoute]);

  return (
    <button 
        onClick={onScrollDown} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer w-fit transition-opacity ${isVisible ? "duration-1000 opacity-100" : "duration-500 opacity-0"}`}>
			<CircularText text="*SCROLL*DOWN" className="absolute" color={color} onHover="goBonkers" isHovered={isHovered} />
      <UseAnimations
        animation={arrowDown}
        size={isHovered ? 35 : 40}
        strokeColor={color}
        speed={isHovered ? 3 : 2}
				className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </button>
  );
};

export default ScrollDownButton;