import React, { StrictMode } from "react";
import LorenzAttractor from "../components/fractals/LorenzAttractor";
import { CalculatorV1 } from "../playground/Calculator";

const Playground = () => {
  return (
    <div>
      <LorenzAttractor />
      <StrictMode>{/* <CalculatorV1 /> */}</StrictMode>
    </div>
  );
};

export default Playground;
