import { useNavigate } from "react-router-dom";
import DarkModeButton from "./buttons/DarkModeButton";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <section className="fixed z-10 top-0 h-12 w-full flex space-x-4 justify-end py-2 px-4">
      <button onClick={() => navigate("/")}>Caju</button>
      <div className="flex-grow" />
      <button onClick={() => navigate("/playground")}>Playground</button>
      <DarkModeButton />
    </section>
  );
};

export default NavBar;
