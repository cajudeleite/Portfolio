import UseAnimations from "react-useanimations";
import settings from "react-useanimations/lib/settings";
import useSideBar from "../../stores/sideBarStore";
import Settings from "../Settings";

const SettingsButton = ({ color }: { color: string }) => {
  const { setSideBarOpen, setChildren } = useSideBar();

  const openSettings = () => {
    setChildren(<Settings />);
    setSideBarOpen(true);
  };

  return (
    <div className="cursor-pointer w-fit self-end">
      <UseAnimations
        animation={settings}
        size={35}
        strokeColor={color}
        speed={2}
        onClick={openSettings}
      />
    </div>
  );
};

export default SettingsButton;
