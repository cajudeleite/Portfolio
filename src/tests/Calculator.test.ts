import { adder, fourBitAdder, fourBitALU } from "../playground/Calculator";
import {
  toBinaryArrayPositive,
  toBinaryArrayPositiveAndNegative,
} from "../utils/Utils";

const testAdder = <T>(
  functionToTest: (a: T, b: T, carryIn: boolean) => { sum: T; carry: boolean },
  a: T | number,
  b: T | number,
  carryIn: boolean,
  expectedSum: T,
  expectedCarry: boolean
) => {
  const { sum, carry } =
    typeof a === "number" || typeof b === "number"
      ? functionToTest(
          toBinaryArrayPositive(a as number) as T,
          toBinaryArrayPositive(b as number) as T,
          carryIn
        )
      : functionToTest(a, b, carryIn);

  test(`a = ${a}, b = ${b}, carryIn = ${carryIn}`, () => {
    expect(sum).toStrictEqual(expectedSum);
    expect(carry).toBe(expectedCarry);
  });
};

describe("\nTesting ADDER", () => {
  testAdder(adder, false, false, false, false, false);
  testAdder(adder, false, false, true, true, false);
  testAdder(adder, false, true, false, true, false);
  testAdder(adder, false, true, true, false, true);
  testAdder(adder, true, false, false, true, false);
  testAdder(adder, true, false, true, false, true);
  testAdder(adder, true, true, false, false, true);
  testAdder(adder, true, true, true, true, true);
});

describe("\nTesting fourBitAdder", () => {
  testAdder(fourBitAdder, 1, 1, false, toBinaryArrayPositive(2), false);

  testAdder(fourBitAdder, 5, 3, true, toBinaryArrayPositive(9), false);

  testAdder(fourBitAdder, 15, 1, false, toBinaryArrayPositive(0), true);

  testAdder(fourBitAdder, 8, 8, true, toBinaryArrayPositive(1), true);
});

const testALU = (
  a: number,
  b: number,
  subtract: boolean,
  expectedSum: number,
  expectedCarry: boolean,
  expectedNegative: boolean,
  expectedZero: boolean
) => {
  const { sum, carry, negative, zero } = fourBitALU(
    toBinaryArrayPositiveAndNegative(a),
    toBinaryArrayPositiveAndNegative(b),
    subtract
  );

  test(`a = ${a}, b = ${b}, subtract = ${subtract}`, () => {
    expect(sum).toStrictEqual(toBinaryArrayPositiveAndNegative(expectedSum));
    expect(carry).toBe(expectedCarry);
    expect(negative).toBe(expectedNegative);
    expect(zero).toBe(expectedZero);
  });
};

describe("\nTesting fourBitALU", () => {
  testALU(1, 1, false, 2, false, false, false);
  testALU(-1, 1, false, 0, true, false, true);
  testALU(1, 1, true, 0, true, false, true);
  testALU(-1, 1, true, -2, true, true, false);
  testALU(7, -8, false, -1, false, true, false);
  testALU(-8, 7, false, -1, false, true, false);
  test("a = 15, b = 1, subtract = false", () => {
    expect(() =>
      fourBitALU(
        toBinaryArrayPositiveAndNegative(15),
        toBinaryArrayPositiveAndNegative(1),
        false
      )
    ).toThrow();
  });
  test("a = 1, b = 15, subtract = true", () => {
    expect(() =>
      fourBitALU(
        toBinaryArrayPositiveAndNegative(1),
        toBinaryArrayPositiveAndNegative(15),
        true
      )
    ).toThrow();
  });
});
