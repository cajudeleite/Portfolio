import { useRef } from "react";
import { paragraph, title } from "../utils/classNameLibrary";
import TextType from "../components/bits/TextType";
import RotatingText, { RotatingTextRef } from "../components/bits/RotatingText";
import useDarkMode from "../stores/darkModeStore";
import ponyo from "../assets/images/Ponyo.jpg";
import rem from "../assets/images/Rem.jpg";

const aboutMeText = [
  <>
    In this section I will tell you a little about myself and my projects, both professional and artistic...
  </>,
  <>
    I'm 23 years old and I'm half brazilian and half french. I'm currently living in Paris and have two cats: <span className="text-primary hover:underline font-medium relative inline-block group" style={{ overflow: 'visible' }}><span>Ponyo</span><img src={ponyo} alt="Ponyo" className="w-64 h-64 absolute top-full left-1/2 -translate-x-1/2 mt-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-lg shadow-lg z-[100] pointer-events-none object-cover" style={{ minWidth: '16rem' }} /></span> and <span className="text-secondary hover:underline font-medium relative inline-block group" style={{ overflow: 'visible' }}><span>Rem</span><img src={rem} alt="Rem" className="w-64 h-64 absolute top-full left-1/2 -translate-x-1/2 mt-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-lg shadow-lg z-[100] pointer-events-none object-cover" style={{ minWidth: '16rem' }} /></span>...
  </>,
  <>
    I'm a full-stack developer with 3+ years of experience with startups and freelancing. I'm also a blockchain enthusiast and have a passion for web3 and crypto. I'm currently working as a software engineer at Cena.art and <a className="text-secondary hover:underline font-medium" href="https://mayya.com/" target="_blank">Mayya</a>...
  </>,
  <>
    In the underground, I'm <a className="text-primary hover:underline font-medium" href="https://soundcloud.com/abazai" target="_blank">Abazai</a>, a psycore DJ and producer. I'm part of <a className="text-secondary hover:underline font-medium" href="https://citrusfrequencies.bandcamp.com/" target="_blank">Citrus Frequencies</a> label and am the founder of <a className="text-primary hover:underline font-medium" href="https://www.instagram.com/abyzmacrew/" target="_blank">Abyzma</a> crew...
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
          mainClassName={`w-fit px-2 sm:px-2 md:px-3 bg-secondary overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg ${title} ${darkMode ? "text-dark" : "text-light"}`}
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
      <div className="relative w-[90dvw] md:w-[50dvw] overflow-visible" style={{ overflow: 'visible' }}>
        <div className="overflow-visible" style={{ overflow: 'visible' }}>
          <TextType 
            text={aboutMeText} 
            className={`text-xl md:text-2xl absolute top-0 left-0 overflow-visible ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
            typingSpeed={35}
            deletingSpeed={15}
            onSentenceComplete={() => {
              rotatingTextRef.current?.next();
            }}
            pauseDuration={5000}
          />
        </div>
      </div>
    </>
  );
};

export default AboutMe;
