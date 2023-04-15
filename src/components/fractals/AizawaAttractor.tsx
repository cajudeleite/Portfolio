import p5Types from "p5";
import { useEffect, useRef } from "react";
import Sketch from "react-p5";
import useFpsThreshold from "../../stores/fpsThresholdStore";

let x = 0.1;
let y = 0;
let z = 0;
const a = 0.95;
const b = 0.7;
const c = 0.6;
const d = 3.5;
const e = 0.25;
const f = 0.1;
let points: { x: number; y: number; z: number }[] = [];
let scale: number;
let angleX: number;
let angleY: number;
const minimumIterations = 100;

const AizawaAttractor = () => {
  const { fpsThreshold } = useFpsThreshold();
  const iterationsRef = useRef(0);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL).parent(
      canvasParentRef
    );
    p5.background(0, 0, 0, 0);
    p5.stroke(202, 94, 4);
    p5.noFill();
    p5.frameRate(60);
    scale = p5.random(179, 269);
    angleX = p5.random(-p5.PI, p5.PI);
    angleY = p5.random(-p5.PI, p5.PI);
  };

  const draw = (p5: p5Types) => {
    p5.translate(window.innerWidth / 4, 0, -80);
    p5.scale(scale);
    p5.rotateX(angleX);
    p5.rotateY(angleY);

    const dt = 0.01;
    const dx = (z - b) * x - d * y;
    const dy = d * x + (z - b) * y;
    const dz =
      c +
      a * z -
      (z * z * z) / 3 -
      (x * x + y * y) * (1 + e * z) +
      f * z * x * x * x;
    x += dx * dt;
    y += dy * dt;
    z += dz * dt;

    points.push({ x, y, z });
    iterationsRef.current += 1;

    p5.beginShape();
    for (let i = 0; i < points.length; i++) {
      p5.vertex(points[i].x, points[i].y, points[i].z);
    }
    p5.endShape();

    const fps = p5.frameRate();
    if (fps < fpsThreshold && iterationsRef.current > minimumIterations) {
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

export default AizawaAttractor;
