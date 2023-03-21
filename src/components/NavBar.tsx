import DarkModeButton from "./buttons/DarkModeButton";

const NavBar = () => {
  return (
    <section className="fixed top-0 h-12 w-full flex justify-end py-2 px-4">
      <DarkModeButton />
    </section>
  );
};

export default NavBar;
