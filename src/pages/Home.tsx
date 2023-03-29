import { StrictMode } from "react";
import IkedaMap from "../components/fractals/IkedaMap";
import LorenzAttractor from "../components/fractals/LorenzAttractor";
import CalculatorDisplay from "../playground/Calculator";
import { toBinaryArrayPositiveAndNegative } from "../utils/Utils";

const Home = () => {
  return (
    <section className="min-h-screen flex items-center">
      <StrictMode>
        <div className="ml-12">
          <p className="text-2xl">
            Hello, my name is{" "}
            <span className="text-primary text-3xl font-medium">Nathan</span>.
            But you can call me
          </p>
          <h1 className="font-exan text-secondary text-8xl">Caju</h1>
        </div>
      </StrictMode>
    </section>
  );
};

export default Home;
