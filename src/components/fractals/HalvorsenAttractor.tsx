import { useEffect, useRef } from "react";
import useFpsThreshold from "../../stores/fpsThresholdStore";
import p5Types from "p5";
import Sketch from "react-p5";

const iterationThreshold = 100;
const a = 1.4;
const mu = 0.3;
let x = 0.1;
let y = 0.1;
let z = 0.1;
let points: { x: number; y: number; z: number }[] = [];
let scale: number;
let angleY: number;

const HalvorsenAttractor = () => {
  const { fpsThreshold } = useFpsThreshold();
  const iterationsRef = useRef(0);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL).parent(
      canvasParentRef
    );
    p5.background(0, 0, 0, 0);
    p5.frameRate(60);
    scale = p5.random(1, 1);
    angleY = p5.random(-p5.PI, p5.PI);
  };

  const draw = (p5: p5Types) => {
    p5.translate(window.innerWidth / 4, 0, -80);
    p5.scale(scale);
    p5.rotateY(angleY);

    const dt = 0.01;
    const dx = -a * x - 4 * y - 4 * z - y * y;
    const dy = -a * y - 4 * z - 4 * x - z * z;
    const dz = -a * z - 4 * x - 4 * y - x * x + mu;

    x += dx * dt;
    y += dy * dt;
    z += dz * dt;

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
    if (fps < fpsThreshold && iterationsRef.current > iterationThreshold) {
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

export default HalvorsenAttractor;
