import { StrictMode, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { RoutePath, routerElements } from "../router";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [previousRoute, setPreviousRoute] = useState<RoutePath>();
  const [currentRoute, setCurrentRoute] = useState(
    location.pathname as RoutePath
  );
  const [scrollUp, setScrollUp] = useState(false);

  const handleRouteChange = (route: RoutePath) => {
    setPreviousRoute(currentRoute);
    navigate(route);
    setTimeout(() => {
      setPreviousRoute(undefined);
      setCurrentRoute(route);
      setScrollUp(false);
    }, 1000);
  };

  const handleScroll = (deltaY: number) => {
    if (previousRoute) return;

    const { previousRoute: prevRoute, nextRoute: nextRoute } =
      routerElements[currentRoute] || {};
    const routeToRedirect = (
      deltaY < 0 ? prevRoute : deltaY > 0 ? nextRoute : null
    ) as RoutePath;

    if (routeToRedirect) {
      setScrollUp(deltaY < 0);
      handleRouteChange(routeToRedirect);
    }
  };

  return (
    <div
      className="h-full w-full relative flex flex-col justify-center scroll-smooth"
      onWheel={(event) => handleScroll(event.deltaY)}
    >
      <NavBar navigate={handleRouteChange} />
      <div
        className={`absolute top-0 ${
          previousRoute ? (scrollUp ? "fade-out-bottom" : "fade-out-top") : ""
        }`}
      >
        {routerElements[currentRoute].background}
      </div>
      <StrictMode>
        <section
          className={`absolute top-0 min-h-screen flex flex-col justify-center ml-12 ${
            previousRoute
              ? scrollUp
                ? "slide-out-bottom"
                : "slide-out-top"
              : ""
          }`}
        >
          {previousRoute && <>{routerElements[previousRoute].element}</>}
        </section>
        <section
          className={`absolute top-0 min-h-screen flex flex-col justify-center ml-12 ${
            previousRoute ? (scrollUp ? "slide-in-top" : "slide-in-bottom") : ""
          }`}
        >
          <Routes>
            {Object.entries(routerElements).map(([path, { element }]) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </section>
      </StrictMode>
    </div>
  );
};

export default App;
