import { RoutePath } from "../router";
import DarkModeButton from "./buttons/DarkModeButton";

const NavBar = ({ navigate }: { navigate: (route: RoutePath) => void }) => {
  return (
    <section className="fixed z-20 top-0 h-12 w-full flex space-x-4 justify-end py-2 px-4">
      <button onClick={() => navigate("/")} className="font-exan text-3xl">
        Caju
      </button>
      <div className="flex-grow" />
      <button onClick={() => navigate("/aboutme")} className="text-lg">
        About Me
      </button>
      {/* <button onClick={() => navigate("/playground")}>Playground</button> */}
      <DarkModeButton />
    </section>
  );
};

export default NavBar;
