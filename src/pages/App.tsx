import { Route, RouterProvider, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import Home from "./Home";
import Playground from "./Playground";

const App = () => {
  return (
    <div className="h-full w-full relative flex items-center">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </div>
  );
};

export default App;
