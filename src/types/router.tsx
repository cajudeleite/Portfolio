import StrangeAttractor from "../components/fractals/StrangeAttractor";
import IkedaMapAttractor from "../components/fractals/IkedaMapAttractor";
import AboutMe from "../pages/AboutMe";
import Home from "../pages/Home";
import Skills from "../pages/Skills";
import WorkExperience from "../pages/WorkExperience";
import { aizawa, lorenz, noseHoover } from "../utils/strangeAttractors";

export type RoutePath = "/" | "/about" | "/skill" | "/work";

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
    nextRoute: "/about",
  },
  "/about": {
    element: <AboutMe />,
    background: <StrangeAttractor props={aizawa} />,
    previousRoute: "/",
    nextRoute: "/skill",
    title: "About Me",
  },
  "/skill": {
    element: <Skills />,
    background: <StrangeAttractor props={lorenz} />,
    previousRoute: "/about",
    nextRoute: "/work",
    title: "Skills",
  },
  "/work": {
    element: <WorkExperience />,
    background: <StrangeAttractor props={noseHoover} />,
    previousRoute: "/skill",
    title: "Work Experience",
  },
  // "/playground": {
  //   element: <Playground />,
  //   background: <LorenzAttractor />,
  // },
};
