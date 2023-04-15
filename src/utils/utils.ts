import { FourBitBinary } from "../types";

/**
 * Converts a positive integer to a four-bit binary array
 *
 * @param num The positive integer to convert (must be in the range 0 to 15)
 * @returns The four-bit binary array representing the input integer
 * @throws An error if the input integer is out of range
 */
export const toBinaryArrayPositive = (num: number) => {
  if (num < 0 || num > 15) {
    throw new Error("Number is out of range");
  }

  const binary = [];
  let quotient = num;

  // Convert the input integer to binary using repeated division by 2
  while (quotient >= 1) {
    binary.unshift(quotient % 2 === 1);
    quotient = Math.floor(quotient / 2);
  }

  // Pad the binary array with leading zeros if necessary to ensure it has
  // exactly 4 bits
  while (binary.length < 4) {
    binary.unshift(false);
  }

  // Return the last 4 bits of the binary array
  return binary.slice(-4) as FourBitBinary;
};

/**
 * Converts a number in the range -8 to 7 (inclusive) to a 4-bit binary array
 *
 * If the input number is negative, it is first converted to its two's complement
 * representation before being converted to a binary array. If the input number is
 * not in the range of -8 to 7, an error is thrown
 *
 * @param num The number to convert to binary
 * @returns A 4-bit binary array representing the input number
 * @throws An error if the input number is out of range
 */
export const toBinaryArrayPositiveAndNegative = (
  num: number
): FourBitBinary => {
  if (num < -8 || num > 7) {
    throw new Error("Number is out of range");
  }

  // Convert the input number to its two's complement if it's negative
  const temp = (num < 0 ? 16 + num : num).toString(2).padStart(4, "0");

  // Convert the string of binary digits to a binary array
  return temp.split("").map((bit) => bit === "1") as FourBitBinary;
};

/**
 * Boolean that returns true if the window width is bellow the mobile size
 */
export const isMobile = window.innerWidth < 768;
