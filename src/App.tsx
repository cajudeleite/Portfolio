import IkedaMap from "./components/fractals/IkedaMap";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div className="h-full w-full relative flex items-center">
      <IkedaMap className="absolute top-0" />
      <NavBar />
      <div className="ml-12">
        <p className="text-2xl">
          Hello, my name is <span className="text-primary text-3xl font-medium">Nathan</span>. But you can call me
        </p>
        <h1 className="font-exan text-secondary text-8xl">Caju</h1>
      </div>
    </div>
  );
};

export default App;
