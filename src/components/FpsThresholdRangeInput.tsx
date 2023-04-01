import useFpsThreshold from "../stores/fpsThresholdStore";

const FpsThresholdRangeInput = () => {
  const { fpsThreshold, setFpsThreshold } = useFpsThreshold();

  return (
    <input
      className="h-2 outline-0 accent-light bg-dark"
      type="range"
      name="fpsThreshold"
      min={0}
      max={60}
      value={fpsThreshold}
      onChange={(event) => setFpsThreshold(parseInt(event.target.value))}
    />
  );
};

export default FpsThresholdRangeInput;
