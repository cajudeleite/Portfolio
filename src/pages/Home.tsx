import { useState } from "react";
import BlurText from "../components/bits/BlurText";
import SplitText from "../components/bits/SplitText";
import { title } from "../utils/classNameLibrary";
import useDarkMode from "../stores/darkModeStore";

const Home = () => {
  const [showCaju, setShowCaju] = useState(false);
  const { darkMode } = useDarkMode();

  return (
    <>
      <BlurText
        text={<>Hello, my name is <span className="text-primary text-3xl font-medium">Nate</span>, but you can call me</>}
        delay={35}
        animateBy="letters"
        direction="top"
        className="text-xl md:text-2xl"
        onAnimationComplete={() => setShowCaju(true)}
      />
      {showCaju ? (
        <SplitText
          text="Caju"
          className={`text-secondary ${title}`}
          delay={150}
          duration={1}
          splitType="chars"
          textAlign="left"
          tag="h1"
        />
      ) : <h1 className={`${darkMode ? "text-dark" : "text-light"} ${title} `}>Caju</h1>}
    </>
  );
};

export default Home;  