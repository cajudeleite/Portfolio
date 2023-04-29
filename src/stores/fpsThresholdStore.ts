import { create } from "zustand";

interface FpsThresholdState {
  fpsThreshold: number;
  setFpsThreshold: (newFpsThreshold: number) => void;
}

const useFpsThreshold = create<FpsThresholdState>((set) => ({
  fpsThreshold:
    "fpsThreshold" in localStorage ? parseInt(localStorage.fpsThreshold) : 30,
  setFpsThreshold: (newFpsThreshold: number) =>
    set((state: FpsThresholdState) => {
      localStorage.setItem("fpsThreshold", newFpsThreshold.toString());
      return { ...state, fpsThreshold: newFpsThreshold };
    }),
}));

export default useFpsThreshold;
