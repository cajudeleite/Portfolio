import { useEffect, useRef, useState } from "react";
import useFpsThreshold from "../../stores/fpsThresholdStore";
import p5Types from "p5";
import Sketch from "react-p5";
import { StrangeAttractorProps } from "../../types/attractor";

const minimumIterations = 100;
let points: { x: number; y: number; z: number }[] = [];
let scale: number;
let angleX: number;
let angleY: number;
let x = 0.1;
let y = 0;
let z = 0;

const StrangeAttractor = ({ props }: { props: StrangeAttractorProps }) => {
  const { fpsThreshold } = useFpsThreshold();
  const iterationsRef = useRef(0);

  useEffect(() => {
    points = [];
    x = 0.1;
    y = 0;
    z = 0;

    return () => {
      points = [];
      x = 0.1;
      y = 0;
      z = 0;
    };
  }, [props]);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL).parent(
      canvasParentRef
    );
    p5.background(0, 0, 0, 0);
    p5.stroke(props.strokeColor);
    p5.noFill();
    p5.frameRate(60);
    scale = p5.random(props.scale);
    angleX = p5.random(-p5.PI, p5.PI);
    angleY = p5.random(-p5.PI, p5.PI);
  };

  const draw = (p5: p5Types) => {
    p5.translate(window.innerWidth / 4, 0, -80);
    p5.scale(scale);
    p5.rotateX(angleX);
    p5.rotateY(angleY);

    const dt = 0.01;
    x += props.dx(x, y, z) * dt;
    y += props.dy(x, y, z) * dt;
    z += props.dz(x, y, z) * dt;

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

  return <Sketch key={props.name} setup={setup} draw={draw} />;
};

export default StrangeAttractor;
