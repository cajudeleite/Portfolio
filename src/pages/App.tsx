import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { RoutePath, routerElements } from "../router";
import Home from "./Home";
import Playground from "./Playground";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname as RoutePath;
  const [previousRoute, setPreviousRoute] = useState<RoutePath>();
  const [currentRoute, setCurrentRoute] = useState<RoutePath>(currentLocation);

  const handleRouteChange = (route: RoutePath) => {
    setPreviousRoute(currentLocation);
    navigate(route);
    setTimeout(() => {
      setPreviousRoute(undefined);
      setCurrentRoute(route);
    }, 1000);
  };

  return (
    <div className="h-full w-full relative flex flex-col justify-center scroll-smooth">
      <NavBar navigate={handleRouteChange} />
      <div className={`absolute top-0 ${previousRoute ? "fade-out-top" : ""}`}>
        {routerElements[currentRoute].background}
      </div>
      <div className={`absolute top-0 ${previousRoute ? "slide-out-top" : ""}`}>
        {previousRoute && <>{routerElements[previousRoute].element}</>}
      </div>
      <div
        className={`absolute top-0 ${previousRoute ? "slide-in-bottom" : ""}`}
      >
        <Routes>
          {Object.entries(routerElements).map(([path, { element }]) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default App;
