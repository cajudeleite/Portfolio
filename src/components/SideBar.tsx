import useSideBar from "../stores/sideBarStore";

const SideBar = () => {
  const { isOpen, children } = useSideBar();

  return (
    <div
      className={`absolute z-30 top-0 right-0 h-screen flex flex-col space-y-4 pt-2 pb-6 pl-12 pr-6 bg-primary text-light ${
        isOpen ? "slide-in-right" : children ? "slide-out-right" : "hidden"
      }`}
    >
      {children}
    </div>
  );
};

export default SideBar;
