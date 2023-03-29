import { StrictMode } from "react";
import IkedaMapAttractor from "../components/fractals/IkedaMapAttractor";
import LorenzAttractor from "../components/fractals/LorenzAttractor";
import CalculatorDisplay from "../playground/Calculator";
import { toBinaryArrayPositiveAndNegative } from "../utils/Utils";

const Home = () => {
  return (
    <>
      <p className="text-2xl">
        Hello, my name is{" "}
        <span className="text-primary text-3xl font-medium">Nathan</span>. But
        you can call me
      </p>
      <h1 className="font-exan text-secondary text-8xl">Caju</h1>
    </>
  );
};

export default Home;
