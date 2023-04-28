import { paragraph, title } from "../utils/classNameLibrary";

const AboutMe = () => {
  return (
    <>
      <h1 className={`text-primary ${title}`}>About Me</h1>
      <p className={paragraph}>
        Studing at{" "}
        <span className="text-secondary text-xl font-medium">École 42</span>{" "}
        computer science school in Paris.
      </p>
      <p className={paragraph}>
        Open to{" "}
        <span className="text-primary text-xl font-medium">freelance</span>{" "}
        projects where I can use my skills.
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
