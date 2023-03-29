import { useState } from "react";
import { FourBitBinary } from "../types";
import { and, nand, nor, not, or, xor } from "../utils/Logic";

/**
 * Performs binary addition of two bits and a carry bit
 *
 * @param a The first bit to add
 * @param b The second bit to add
 * @param carryIn The carry bit to add
 * @returns An object containing the sum and carry bits resulting from the addition
 */
export const adder = (a: boolean, b: boolean, carryIn: boolean) => {
  // Calculate the XOR of the two input bits
  const inputXor = xor(a, b);

  // Calculate the sum by XORing the input XOR with the carry in
  const sum = xor(inputXor, carryIn);

  // Calculate the carry by ORing the AND of the input XOR and the carry in
  // with the AND of the input bits
  const carry = or(and(inputXor, carryIn), and(a, b));

  // Return an object containing the resulting sum and carry bits
  return { sum, carry };
};

const BitInput = ({
  bitValue,
  flipBit,
  label,
}: {
  bitValue: boolean;
  flipBit: () => void;
  label?: string;
}) => (
  <div className="relative">
    <button
      className={`h-8 w-8 relative rounded-full border-4 border-gray-500 ${
        bitValue ? "bg-red-500" : "bg-gray-700"
      }`}
      onClick={flipBit}
    />
    <span className="absolute right-full">{label}</span>
  </div>
);

export const CalculatorV1 = () => {
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  const [inputCarry, setInputCarry] = useState(false);

  return (
    <div className="flex flex-col ml-16">
      <BitInput bitValue={inputA} flipBit={() => setInputA(not(inputA))} />
      <BitInput bitValue={inputB} flipBit={() => setInputB(not(inputB))} />
      <BitInput
        bitValue={inputCarry}
        flipBit={() => setInputCarry(not(inputCarry))}
        label="Carry"
      />
    </div>
  );
};

/**
 * Performs binary addition on two 4-bit binary numbers with an optional carry input
 *
 * @param a The first 4-bit binary number
 * @param b The second 4-bit binary number
 * @param carryIn The optional carry input to the addition circuit
 * @returns An object with the resulting sum as a 4-bit binary number and the carry out bit
 */
export const fourBitAdder = (
  a: FourBitBinary,
  b: FourBitBinary,
  carryIn: boolean
) => {
  // Add the most significant bits and the carry input (if any)
  const firstAdder = adder(a[3], b[3], carryIn);

  // Add the next most significant bits and the carry out from the previous addition
  const secondAdder = adder(a[2], b[2], firstAdder.carry);
  const thirdAdder = adder(a[1], b[1], secondAdder.carry);

  // Add the least significant bits and the carry out from the previous addition
  const fourthAdder = adder(a[0], b[0], thirdAdder.carry);

  return {
    // Combine the sum bits from all four adders to create the final 4-bit binary sum
    sum: [
      fourthAdder.sum,
      thirdAdder.sum,
      secondAdder.sum,
      firstAdder.sum,
    ] as FourBitBinary,
    // The carry out is the carry out bit from the last adder
    carry: fourthAdder.carry,
  };
};

/**
 * A four-bit Arithmetic Logic Unit (ALU) function that performs addition or
 * subtraction on two four-bit binary numbers
 *
 * @param a The first four-bit binary number
 * @param b The second four-bit binary number
 * @param subtract A boolean value that specifies whether to perform subtraction
 * instead of addition
 * @returns An object containing the result of the operation, the carry, and the
 * negative and zero flags
 */
export const fourBitALU = (
  a: FourBitBinary,
  b: FourBitBinary,
  subtract: boolean
) => {
  // Negate the second input if subtracting
  const negativeInput = b.map((bit) => xor(bit, subtract)) as FourBitBinary;

  // Perform the addition or subtraction operation
  const { sum, carry } = fourBitAdder(a, negativeInput, subtract);

  // Calculate the negative and zero flags
  const negative = sum[0];
  const zero = and(
    and(and(not(sum[3]), not(sum[2])), not(sum[1])),
    not(sum[0])
  );

  return { sum, carry, negative, zero };
};

/**
 * Takes a 4-bit binary number represented as a boolean array and returns an object
 * that represents which segments of a 7-segment display need to be lit up to display
 * the corresponding decimal number
 *
 * @param data A 4-bit binary number represented as a boolean array
 * @returns An object containing boolean values indicating which segments of a 7-segment
 * display need to be lit up to display the corresponding decimal number
 */
const fourBitsBinaryToDisplay = (data: FourBitBinary) => {
  // Extract each bit of the binary number for easier reference
  const firstBit = data[3];
  const secondBit = data[2];
  const thirdBit = data[1];
  const fourthBit = data[0];

  // Calculate the boolean value for segment a
  const a = or(
    xor(xor(fourthBit, thirdBit), nor(fourthBit, or(secondBit, firstBit))),
    or(
      and(or(xor(thirdBit, secondBit), not(firstBit)), firstBit),
      nor(nor(not(thirdBit), secondBit), firstBit)
    )
  );
  // Calculate the boolean value for segment b
  const b = nand(
    and(xor(fourthBit, thirdBit), or(xor(thirdBit, secondBit), not(firstBit))),
    or(secondBit, firstBit)
  );
  // Calculate the boolean value for segment c
  const c = or(
    nand(
      nand(
        and(
          xor(fourthBit, thirdBit),
          or(xor(thirdBit, secondBit), not(firstBit))
        ),
        or(secondBit, firstBit)
      ),
      or(secondBit, firstBit)
    ),
    firstBit
  );
  // Calculate the boolean value for segment d
  const d = or(
    and(or(xor(thirdBit, secondBit), not(firstBit)), firstBit),
    nor(nor(not(thirdBit), secondBit), firstBit)
  );
  // Calculate the boolean value for segment e
  const e = nor(nor(not(thirdBit), secondBit), firstBit);
  // Calculate the boolean value for segment f
  const f = nand(
    nand(
      and(
        xor(fourthBit, thirdBit),
        or(xor(thirdBit, secondBit), not(firstBit))
      ),
      or(secondBit, firstBit)
    ),
    or(secondBit, firstBit)
  );
  // Calculate the boolean value for segment g
  const g = or(
    xor(
      nor(fourthBit, or(secondBit, firstBit)),
      or(xor(thirdBit, secondBit), not(firstBit))
    ),
    nor(not(thirdBit), secondBit)
  );

  // Return an object containing the boolean values for each segment, as well as the
  // sign bit
  return {
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    sign: fourthBit,
  };
};

const CalculatorDisplay = ({ data }: { data: FourBitBinary }) => {
  const HorizontalHexagon = ({
    active = false,
    className,
  }: {
    active?: boolean;
    className?: string;
  }) => (
    <div className={`w-full flex justify-center ${className}`}>
      <div
        className={`float-left w-0 border-r-4 border-t-4 border-b-4 border-t-transparent border-b-transparent ${
          active ? "border-r-white" : "border-r-gray-700"
        }`}
      />
      <div
        className={`float-left w-8 h-2 ${active ? "bg-white" : "bg-gray-700"}`}
      />
      <div
        className={`float-left w-0 border-l-4 border-t-4 border-b-4 border-t-transparent border-b-transparent ${
          active ? "border-l-white" : "border-l-gray-700"
        }`}
      />
    </div>
  );

  const VerticalHexagon = ({ active = false }: { active?: boolean }) => (
    <div className="-mt-1">
      <div
        className={`w-0 border-b-4 border-l-4 border-r-4 border-l-transparent border-r-transparent ${
          active ? "border-b-white" : "border-b-gray-700"
        }`}
      />
      <div className={`w-2 h-8 ${active ? "bg-white" : "bg-gray-700"}`} />
      <div
        className={`w-0 border-t-4 border-l-4 border-r-4 border-l-transparent border-r-transparent ${
          active ? "border-t-white" : "border-t-gray-700"
        }`}
      />
    </div>
  );

  const { a, b, c, d, e, f, g, sign } = fourBitsBinaryToDisplay(data);

  return (
    <div className="flex items-center">
      <div className="w-5 h-2 flex justify-center">
        <div
          className={`float-left w-0 border-r-4 border-t-4 border-b-4 border-t-transparent border-b-transparent ${
            sign ? "border-r-white" : "border-r-gray-700"
          }`}
        />
        <div
          className={`float-left w-8 h-2 ${sign ? "bg-white" : "bg-gray-700"}`}
        />
        <div
          className={`float-left w-0 border-l-4 border-t-4 border-b-4 border-t-transparent border-b-transparent ${
            sign ? "border-l-white" : "border-l-gray-700"
          }`}
        />
      </div>
      <div className="w-12 flex justify-between flex-wrap gap-1">
        <HorizontalHexagon active={a} />
        <VerticalHexagon active={f} />
        <VerticalHexagon active={b} />
        <HorizontalHexagon active={g} className="-mt-1" />
        <VerticalHexagon active={e} />
        <VerticalHexagon active={c} />
        <HorizontalHexagon active={d} className="-mt-1" />
      </div>
    </div>
  );
};

export default CalculatorDisplay;
