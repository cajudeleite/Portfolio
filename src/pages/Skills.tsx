import { title } from "../utils/classNameLibrary";
import SkillBlocks from "../components/SkillBlocks";
import MagicBento from "../components/bits/MagicBento";

const Skills = () => (
  <>
    <h1 className={`text-secondary ${title}`}>Skills</h1>
    {/* <SkillBlocks /> */}
    <MagicBento 
      textAutoHide={true}
      enableStars={true}
      enableSpotlight={false}
      enableBorderGlow={true}
      enableTilt={false}
      enableMagnetism={true}
      clickEffect={true}
      spotlightRadius={300}
      particleCount={12}
      glowColor="202, 94, 4"
    />
  </>
);

export default Skills;
