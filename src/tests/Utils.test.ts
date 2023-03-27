import {
  toBinaryArrayPositive,
  toBinaryArrayPositiveAndNegative,
} from "../utils/Utils";

describe("\nTesting toBinaryArrayPositive", () => {
  test("11", () =>
    expect(toBinaryArrayPositive(11)).toStrictEqual([true, false, true, true]));
  test("2", () =>
    expect(toBinaryArrayPositive(2)).toStrictEqual([
      false,
      false,
      true,
      false,
    ]));
  test("0", () =>
    expect(toBinaryArrayPositive(0)).toStrictEqual([
      false,
      false,
      false,
      false,
    ]));
  test("15", () =>
    expect(toBinaryArrayPositive(15)).toStrictEqual([true, true, true, true]));
  test("7", () =>
    expect(toBinaryArrayPositive(7)).toStrictEqual([false, true, true, true]));
  test("16", () =>
    expect(() => toBinaryArrayPositive(16)).toThrow("Number is out of range"));
  test("-1", () =>
    expect(() => toBinaryArrayPositive(-1)).toThrow("Number is out of range"));
});

describe("\nTesting toBinaryArrayPositiveAndNegative", () => {
  test("2", () =>
    expect(toBinaryArrayPositiveAndNegative(2)).toStrictEqual([
      false,
      false,
      true,
      false,
    ]));
  test("0", () =>
    expect(toBinaryArrayPositiveAndNegative(0)).toStrictEqual([
      false,
      false,
      false,
      false,
    ]));
  test("-1", () =>
    expect(toBinaryArrayPositiveAndNegative(-1)).toStrictEqual([
      true,
      true,
      true,
      true,
    ]));
  test("16", () =>
    expect(() => toBinaryArrayPositiveAndNegative(16)).toThrow(
      "Number is out of range"
    ));
  test("-9", () =>
    expect(() => toBinaryArrayPositiveAndNegative(-9)).toThrow(
      "Number is out of range"
    ));
  test("7", () =>
    expect(toBinaryArrayPositiveAndNegative(7)).toStrictEqual([
      false,
      true,
      true,
      true,
    ]));
  test("-8", () =>
    expect(toBinaryArrayPositiveAndNegative(-8)).toStrictEqual([
      true,
      false,
      false,
      false,
    ]));
});
