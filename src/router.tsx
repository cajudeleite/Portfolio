import IkedaMap from "./components/fractals/IkedaMap";
import LorenzAttractor from "./components/fractals/LorenzAttractor";
import Home from "./pages/Home";
import Playground from "./pages/Playground";

export const routerElements = {
  "/": {
    element: <Home />,
    background: <IkedaMap />,
  },
  "/playground": {
    element: <Playground />,
    background: <LorenzAttractor />,
  },
};

export type RoutePath = keyof typeof routerElements;
