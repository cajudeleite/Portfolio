import { title } from "../utils/classNameLibrary";
import MagicBento from "../components/bits/MagicBento";
import useFpsThreshold from "../stores/fpsThresholdStore";

const Skills = () => {
  const { fpsThreshold } = useFpsThreshold();
  
  return <>
    <h1 className={`text-secondary ${title}`}>Skills</h1>
    <MagicBento 
      textAutoHide={true}
      enableStars={true}
      enableSpotlight={false}
      enableBorderGlow={true}
      enableTilt={false}
      enableMagnetism={false}
      clickEffect={true}
      particleCount={fpsThreshold / 2}
      glowColor="202, 94, 4"
    />
  </>
};

export default Skills;
