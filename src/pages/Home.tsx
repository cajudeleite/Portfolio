import { title } from "../utils/classNameLibrary";

const Home = () => {
  return (
    <>
      <h2 className="text-xl md:text-2xl">
        Hello, my name is{" "}
        <span className="text-primary text-3xl font-medium">Nate</span>, but
        you can call me
      </h2>
      <h1 className={`text-secondary ${title}`}>Caju</h1>
    </>
  );
};

export default Home;
