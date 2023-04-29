import StrangeAttractor from "../components/StrangeAttractor";
import AizawaAttractor from "../components/fractals/AizawaAttractor";
import HalvorsenAttractor from "../components/fractals/HalvorsenAttractor";
import IkedaMapAttractor from "../components/fractals/IkedaMapAttractor";
import LorenzAttractor from "../components/fractals/LorenzAttractor";
import NoseHooverAttractor from "../components/fractals/NoseHooverAttractor";
import AboutMe from "../pages/AboutMe";
import Home from "../pages/Home";
import Playground from "../pages/Playground";
import Skills from "../pages/Skills";
import { aizawa, noseHoover } from "../utils/strangeAttractors";

export type RoutePath = "/" | "/aboutme" | "/skills";

type RouteElement = {
  element: React.ReactElement;
  background: React.ReactElement;
  nextRoute?: RoutePath;
  previousRoute?: RoutePath;
  title?: string;
};

type RouterElements = {
  [key in RoutePath]: RouteElement;
};

export const routerElements: RouterElements = {
  "/": {
    element: <Home />,
    background: <IkedaMapAttractor />,
    nextRoute: "/aboutme",
  },
  "/aboutme": {
    element: <AboutMe />,
    background: <StrangeAttractor props={aizawa} />,
    previousRoute: "/",
    nextRoute: "/skills",
    title: "About Me",
  },
  "/skills": {
    element: <Skills />,
    background: <StrangeAttractor props={noseHoover} />,
    previousRoute: "/aboutme",
    title: "Skills",
  },
  // "/playground": {
  //   element: <Playground />,
  //   background: <LorenzAttractor />,
  // },
};
