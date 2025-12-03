import p5Types from "p5";
import { useEffect, useRef, useState } from "react";
import Sketch from "react-p5";
import useFpsThreshold from "../../stores/fpsThresholdStore";
import useDarkMode from "../../stores/darkModeStore";

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

const TRANSITION_DURATION_MS = 1000;

const AizawaAttractor = () => {
  const { fpsThreshold } = useFpsThreshold();
  const { darkMode } = useDarkMode();
  const iterationsRef = useRef(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const p5InstanceRef = useRef<p5Types | null>(null);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5InstanceRef.current = p5;
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

  const resetFractal = (p5: p5Types) => {
    x = 0.1;
    y = 0;
    z = 0;
    points = [];
    iterationsRef.current = 0;
    scale = p5.random(179, 269);
    angleX = p5.random(-p5.PI, p5.PI);
    angleY = p5.random(-p5.PI, p5.PI);
    p5.background(0, 0, 0, 0);
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
    if (fps < fpsThreshold && iterationsRef.current > minimumIterations && !showOverlay) {
      // Start fade in overlay
      setShowOverlay(true);
      
      // Clear any existing timeout
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      
      // Reset fractal after transition completes
      resetTimeoutRef.current = setTimeout(() => {
        if (p5InstanceRef.current) {
          resetFractal(p5InstanceRef.current);
        }
        // Start fade out overlay
        setTimeout(() => {
          setShowOverlay(false);
        }, 50); // Small delay to ensure reset is complete
      }, TRANSITION_DURATION_MS);
    }
  };

  useEffect(() => {
    return () => {
      points = [];
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <Sketch setup={setup} draw={draw} />
      {/* Overlay for smooth transition - positioned to cover only the background canvas */}
      <div
        className={`absolute top-0 left-0 w-full h-full z-10 transition-opacity duration-1000 ${
          showOverlay ? "opacity-100" : "opacity-0 pointer-events-none"
        } ${darkMode ? "bg-dark" : "bg-light"}`}
      />
    </div>
  );
};

export default AizawaAttractor;
