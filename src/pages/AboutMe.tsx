import { paragraph, title } from "../utils/classNameLibrary";
import TextType from "../components/bits/TextType";

const aboutMeText = [
  <>
    Almost starting{" "}
    <span className="text-secondary font-medium">42</span> computer
    science school.
  </>,
  <>
    Looking for a{" "}
    <span className="text-primary font-medium">freelance</span>{" "}
    opportunity where I can use my skills.
  </>,
  <>
    Would like to carry on with my{" "}
    <span className="text-secondary font-medium">
      learning curve
    </span>{" "}
    and bring in my previous experiences in a professional environment.
  </>   
];

const AboutMe = () => {
  return (
    <>
      <h1 className={`text-primary ${title}`}>About Me</h1>
      <TextType text={aboutMeText} className="text-xl md:text-2xl" />
    </>
  );
};

export default AboutMe;
