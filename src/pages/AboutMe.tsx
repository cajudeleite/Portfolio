import { useRef } from "react";
import { paragraph, title } from "../utils/classNameLibrary";
import TextType from "../components/bits/TextType";
import RotatingText, { RotatingTextRef } from "../components/bits/RotatingText";
import useDarkMode from "../stores/darkModeStore";

const aboutMeText = [
  <>
    In this section I will tell you a little about <span className="text-secondary font-medium">myself</span> and my <span className="text-primary font-medium">projects</span>, both <span className="text-secondary font-medium">professional</span> and <span className="text-primary font-medium">artistic</span>...
  </>,
  <>
    I'm 23 years old and I'm half <span className="text-secondary font-medium">brazilian</span> and half <span className="text-primary font-medium">french</span>. I'm currently living in <span className="text-secondary font-medium">Paris</span> and have two cats: <span className="text-primary font-medium">Ponyo</span> and <span className="text-secondary font-medium">Rem</span>...
  </>,
  <>
    I'm a <span className="text-secondary font-medium">full-stack</span> developer with <span className="text-primary font-medium">3+</span> years of experience with <span className="text-secondary font-medium">startups</span> and <span className="text-primary font-medium">freelancing</span>. I'm also a <span className="text-secondary font-medium">blockchain</span> enthusiast and have a passion for <span className="text-primary font-medium">web3</span> and <span className="text-secondary font-medium">crypto</span>. I'm currently working as a <span className="text-secondary font-medium">software engineer</span> at <span className="text-primary font-medium">Cena.art</span> and <span className="text-secondary font-medium">Mayya</span>...
  </>,
  <>
    In the underground, I'm <span className="text-primary font-medium">Abazai</span>, a <span className="text-secondary font-medium">psycore</span> DJ and producer. I'm part of <span className="text-primary font-medium">Citrus Frequencies</span> label and am the founder of <span className="text-secondary font-medium">Abyzma</span> crew...
  </>   
];

const AboutMe = () => {
  const { darkMode } = useDarkMode();
  const rotatingTextRef = useRef<RotatingTextRef>(null);

  return (
    <>
      <div className="flex items-center space-x-4 mb-4">
        <h1 className={`text-primary ${title}`}>About</h1>
        <RotatingText
          ref={rotatingTextRef}
          texts={["Me", "Nate", "Caju", "Abazai"]}
          mainClassName={`w-fit px-2 sm:px-2 md:px-3 bg-primary overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg ${title} ${darkMode ? "text-dark" : "text-light"}`}
          staggerFrom="first"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.15}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={5000}
          auto={false}
        />
      </div>
      <div className="relative w-[90dvw] md:w-[50dvw]">
        <TextType 
          text={aboutMeText} 
          className="text-xl md:text-2xl absolute top-0 left-0"
          typingSpeed={35}
          deletingSpeed={15}
          onSentenceComplete={() => {
            rotatingTextRef.current?.next();
          }}
        />
      </div>
    </>
  );
};

export default AboutMe;
