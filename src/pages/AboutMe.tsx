import { paragraph, title } from "../utils/classNameLibrary";

const AboutMe = () => {
  return (
    <>
      <h1 className={`text-primary ${title}`}>About Me</h1>
      <p className={paragraph}>
        Almost starting{" "}
        <span className="text-secondary text-xl font-medium">42</span> computer
        science school.
      </p>
      <p className={paragraph}>
        Looking for a{" "}
        <span className="text-primary text-xl font-medium">freelance</span>{" "}
        opportunity where I can use my skills.
      </p>
      <p className={paragraph}>
        Would like to carry on with my{" "}
        <span className="text-secondary text-xl font-medium">
          learning curve
        </span>{" "}
        and bring in my previous experiences in a professional environment.
      </p>
    </>
  );
};

export default AboutMe;
