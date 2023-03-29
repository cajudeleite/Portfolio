import React, { StrictMode } from "react";
import LorenzAttractor from "../components/fractals/LorenzAttractor";
import { CalculatorV1 } from "../playground/Calculator";

const Playground = () => {
  return (
    <section className="min-h-screen flex items-center">
      <StrictMode>
        <CalculatorV1 />
      </StrictMode>
    </section>
  );
};

export default Playground;
