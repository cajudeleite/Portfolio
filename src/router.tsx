import AizawaAttractor from "./components/fractals/AizawaAttractor";
import IkedaMapAttractor from "./components/fractals/IkedaMapAttractor";
import LorenzAttractor from "./components/fractals/LorenzAttractor";
import AboutMe from "./pages/AboutMe";
import Home from "./pages/Home";
import Playground from "./pages/Playground";

type RouteElement = {
  element: React.ReactElement;
  background: React.ReactElement;
  nextRoute?: string;
  previousRoute?: string;
  title?: string;
};

export type RoutePath = "/" | "/aboutme";

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
    title: "About Me",
  },
  // "/playground": {
  //   element: <Playground />,
  //   background: <LorenzAttractor />,
  // },
};
