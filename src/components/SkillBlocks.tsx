import { useMemo } from "react";
import skills from "../utils/skillList";
import { phi } from "../utils/constants";
import { isMobile } from "../utils/utils";

const SkillBlocks = () => {
  const windowHeight: number = useMemo(
    () =>
      isMobile ? window.innerWidth * (phi - 1) - 20 : window.innerHeight / 2,
    []
  );

  const goldenRatioSquares = skills.map((skill, index) => {
    const size = windowHeight * Math.pow(phi, -index);

    return (
      <p
        className="border-2 flex justify-center items-center cursor-pointer text-lg font-semibold"
        style={{
          height: size,
          width: size,
          color: skill.color,
          borderColor: skill.color,
        }}
        key={skill.name}
        onClick={() => window.open(skill.url, "_blank")}
      >
        {skill.name}
      </p>
    );
  });

  return goldenRatioSquares.reduceRight((prev, curr, index) => (
    <div
      className={`flex ${index % 2 == 0 ? "flex-row" : "flex-col"}`}
      key={index}
    >
      {[curr, prev]}
    </div>
  ));
};

export default SkillBlocks;
