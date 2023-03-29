import p5Types from "p5";
import { useEffect, useRef } from "react";
import Sketch from "react-p5";

let x = 0.01;
let y = 0;
let z = 0;
const sigma = 10;
const rho = 28;
const beta = 8 / 3;
let points: { x: number; y: number; z: number }[] = [];
let scale: number;
let angleY: number;
const thresholdFPS = 20;
const iterationThreshold = 100;

const LorenzAttractor = () => {
  const iterationsRef = useRef(0);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL).parent(
      canvasParentRef
    );
    p5.background(0, 0, 0, 0);
    p5.frameRate(60);
    scale = p5.random(13, 17);
    angleY = p5.random(-p5.PI, p5.PI);
  };

  const draw = (p5: p5Types) => {
    p5.translate(window.innerWidth / 4, 0, -80);
    p5.scale(scale);
    p5.rotateY(angleY);

    const dt = 0.01;
    const dx = sigma * (y - x) * dt;
    const dy = (x * (rho - z) - y) * dt;
    const dz = (x * y - beta * z) * dt;
    x += dx;
    y += dy;
    z += dz;

    points.push({ x, y, z });
    iterationsRef.current += 1;

    p5.stroke(57, 155, 27);
    p5.noFill();

    p5.beginShape();
    for (let i = 0; i < points.length; i++) {
      p5.vertex(points[i].x, points[i].y, points[i].z);
    }
    p5.endShape();

    const fps = p5.frameRate();
    if (fps < thresholdFPS && iterationsRef.current > iterationThreshold) {
      p5.noLoop();
    }
  };

  useEffect(() => {
    return () => {
      points = [];
    };
  }, []);

  return <Sketch setup={setup} draw={draw} />;
};

export default LorenzAttractor;
