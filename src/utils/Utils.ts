import { FourBitBinary } from "../types";

export const toBinaryArrayPositive = (num: number) => {
  if (num < 0 || num > 15) {
    throw new Error("Number is out of range");
  }

  const binary = [];
  let quotient = num;

  while (quotient >= 1) {
    binary.unshift(quotient % 2 === 1);
    quotient = Math.floor(quotient / 2);
  }

  while (binary.length < 4) {
    binary.unshift(false);
  }

  return binary.slice(-4) as FourBitBinary;
};

export const toBinaryArrayPositiveAndNegative = (
  num: number
): FourBitBinary => {
  if (num < -8 || num > 7) {
    throw new Error("Number is out of range");
  }

  const temp = (num < 0 ? 16 + num : num).toString(2).padStart(4, "0");
  return temp.split("").map((bit) => bit === "1") as FourBitBinary;
};
