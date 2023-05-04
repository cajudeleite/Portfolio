import StrangeAttractor from "../components/fractals/StrangeAttractor";
import IkedaMapAttractor from "../components/fractals/IkedaMapAttractor";
import AboutMe from "../pages/AboutMe";
import Home from "../pages/Home";
import Skills from "../pages/Skills";
import WorkExperience from "../pages/WorkExperience";
import { aizawa, halvorsen, noseHoover } from "../utils/strangeAttractors";

export type RoutePath = "/" | "/about" | "/skills" | "/work";

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
    nextRoute: "/skills",
    title: "About",
  },
  "/skills": {
    element: <Skills />,
    background: <StrangeAttractor props={halvorsen} />,
    previousRoute: "/about",
    nextRoute: "/work",
    title: "Skills",
  },
  "/work": {
    element: <WorkExperience />,
    background: <StrangeAttractor props={noseHoover} />,
    previousRoute: "/skills",
    title: "Work",
  },
  // "/playground": {
  //   element: <Playground />,
  //   background: <LorenzAttractor />,
  // },
};
