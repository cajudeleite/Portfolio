import p5Types from "p5";
import Sketch from "react-p5";

let x = 0;
let y = 0;
let u = 0;
let v = 0;
let a = 0;
let b = 0;
let c = 0;
let n = 0;

const IkedaMapAttractor = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );
    p5.background(0, 0, 0, 0);
    p5.stroke(57, 155, 27);
    p5.noFill();
    a = p5.random(0.7, 0.9);
    b = p5.random(0.7, 0.9);
    c = p5.random(6, 11);
    n = p5.random(19, 97);
  };

  const draw = (p5: p5Types) => {
    for (let i = 0; i < n; i++) {
      const t = 0.4 - c / (1 + x * x + y * y);
      const xt = 1 + a * (x * p5.cos(t) - y * p5.sin(t));
      const yt = b * (x * p5.sin(t) + y * p5.cos(t));
      x = xt;
      y = yt;
      u = p5.map(x, -1, 1, 0, p5.width);
      v = p5.map(y, -1, 1, 0, p5.height);
      p5.point(u, v);
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default IkedaMapAttractor;
