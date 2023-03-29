import AizawaAttractor from "./components/fractals/AizawaAttractor";
import IkedaMapAttractor from "./components/fractals/IkedaMapAttractor";
import LorenzAttractor from "./components/fractals/LorenzAttractor";
import AboutMe from "./pages/AboutMe";
import Home from "./pages/Home";
import Playground from "./pages/Playground";

export const routerElements = {
  "/": {
    element: <Home />,
    background: <IkedaMapAttractor />,
    previousRoute: null,
    nextRoute: "/aboutme",
  },
  "/aboutme": {
    element: <AboutMe />,
    background: <AizawaAttractor />,
    previousRoute: "/",
    nextRoute: null,
  },
  // "/playground": {
  //   element: <Playground />,
  //   background: <LorenzAttractor />,
  // },
};

export type RoutePath = keyof typeof routerElements;
