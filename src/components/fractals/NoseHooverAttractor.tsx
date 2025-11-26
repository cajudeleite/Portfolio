import p5Types from "p5";
import { useEffect, useRef, useState } from "react";
import Sketch from "react-p5";
import useFpsThreshold from "../../stores/fpsThresholdStore";
import useDarkMode from "../../stores/darkModeStore";

const iterationThreshold = 100;
const a = 1.5;
let x = 0.01;
let y = 0;
let z = 0;
let points: { x: number; y: number; z: number }[] = [];
let scale: number;
let angleX: number;
let angleY: number;

const TRANSITION_DURATION_MS = 1000;

const NoseHooverAttractor = () => {
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
    p5.frameRate(60);
    scale = p5.random(50, 100);
    angleX = p5.random(-p5.PI, p5.PI);
    angleY = p5.random(-p5.PI, p5.PI);
  };

  const resetFractal = (p5: p5Types) => {
    x = 0.01;
    y = 0;
    z = 0;
    points = [];
    iterationsRef.current = 0;
    scale = p5.random(50, 100);
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
    const dx = y * dt;
    const dy = (-x + y * z) * dt;
    const dz = (a - y ** 2) * dt;

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
    if (fps < fpsThreshold && iterationsRef.current > iterationThreshold && !showOverlay) {
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

export default NoseHooverAttractor;
