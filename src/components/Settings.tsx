import useFpsThreshold from "../stores/fpsThresholdStore";
import useSideBar from "../stores/sideBarStore";
import CloseButton from "./buttons/CloseButton";
import DarkModeButton from "./buttons/DarkModeButton";
import FpsThresholdRangeInput from "./FpsThresholdRangeInput";

const Settings = () => {
  const { setSideBarOpen } = useSideBar();
  const { fpsThreshold } = useFpsThreshold();

  return (
    <>
      <CloseButton
        onClick={() => setSideBarOpen(false)}
        className="self-end hidden md:block"
      />
      <div className="flex items-center space-x-4">
        <h3 className="mt-1">Color theme:</h3>
        <DarkModeButton />
      </div>
      <div className="flex items-center space-x-4">
        <h3>FPS threshold:</h3>
        <p>{fpsThreshold}</p>
        <FpsThresholdRangeInput />
      </div>
    </>
  );
};

export default Settings;
