import AizawaAttractor from "./components/fractals/AizawaAttractor";
import IkedaMapAttractor from "./components/fractals/IkedaMapAttractor";
import LorenzAttractor from "./components/fractals/LorenzAttractor";
import AboutMe from "./pages/AboutMe";
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import Skills from "./pages/Skills";
import { isMobile } from "./utils/utils";

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
    background: <AizawaAttractor />,
    previousRoute: "/",
    nextRoute: "/skills",
    title: "About Me",
  },
  "/skills": {
    element: <Skills />,
    background: isMobile ? <></> : <LorenzAttractor />,
    previousRoute: "/aboutme",
    title: "Skills",
  },
  // "/playground": {
  //   element: <Playground />,
  //   background: <LorenzAttractor />,
  // },
};
