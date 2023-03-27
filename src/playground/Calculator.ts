import { FourBitBinary } from "../types";
import { and, not, or, xor } from "../utils/Logic";
import { toBinaryArrayPositiveAndNegative } from "../utils/Utils";

export const adder = (a: boolean, b: boolean, carryIn: boolean) => {
  const inputXor = xor(a, b);
  const sum = xor(inputXor, carryIn);
  const carry = or(and(inputXor, carryIn), and(a, b));

  return { sum, carry };
};

export const fourBitAdder = (
  a: FourBitBinary,
  b: FourBitBinary,
  carryIn: boolean
) => {
  const firstAdder = adder(a[3], b[3], carryIn);
  const secondAdder = adder(a[2], b[2], firstAdder.carry);
  const thirdAdder = adder(a[1], b[1], secondAdder.carry);
  const fourthAdder = adder(a[0], b[0], thirdAdder.carry);

  return {
    sum: [
      fourthAdder.sum,
      thirdAdder.sum,
      secondAdder.sum,
      firstAdder.sum,
    ] as FourBitBinary,
    carry: fourthAdder.carry,
  };
};

export const fourBitALU = (
  a: FourBitBinary,
  b: FourBitBinary,
  subtract: boolean
) => {
  const negativeInput = b.map((bit) => xor(bit, subtract)) as FourBitBinary;
  const { sum, carry } = fourBitAdder(a, negativeInput, subtract);
  const negative = sum[0];
  const zero = and(
    and(and(not(sum[3]), not(sum[2])), not(sum[1])),
    not(sum[0])
  );

  return { sum, carry, negative, zero };
};

// console.log(
//   fourBitALU(
//     toBinaryArrayPositiveAndNegative(7),
//     toBinaryArrayPositiveAndNegative(5),
//     false
//   )
// );
