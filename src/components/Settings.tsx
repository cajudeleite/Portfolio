import useFpsThreshold from "../stores/fpsThresholdStore";
import useSideBar from "../stores/sideBarStore";
import ElasticSlider from "./bits/ElasticSlider";
import CloseButton from "./buttons/CloseButton";
import DarkModeButton from "./buttons/DarkModeButton";

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
      <div className="flex items-center space-x-4 pr-12">
        <h3>FPS threshold:</h3>
        <p className="pr-4">{fpsThreshold}</p>
        <ElasticSlider
          leftIcon={<>-</>}
          rightIcon={<>+</>}
          startingValue={0}
          maxValue={60}
          isStepped
          stepSize={1}
        />
      </div>
    </>
  );
};

export default Settings;
