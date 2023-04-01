import {
  and,
  not,
  nand,
  or,
  xor,
  nor,
  srLatch,
  dLatch,
  fourBitRegister,
} from "../utils/logic";
import { toBinaryArrayPositive } from "../utils/utils";

describe("\nTesting AND", () => {
  test("a = false, b = false", () => expect(and(false, false)).toBe(false));
  test("a = false, b = true", () => expect(and(false, true)).toBe(false));
  test("a = true, b = false", () => expect(and(true, false)).toBe(false));
  test("a = true, b = true", () => expect(and(true, true)).toBe(true));
});

describe("\nTesting NOT", () => {
  test("a = false", () => expect(not(false)).toBe(true));
  test("a = true", () => expect(not(true)).toBe(false));
});

describe("\nTesting NAND", () => {
  test("a = false, b = false", () => expect(nand(false, false)).toBe(true));
  test("a = false, b = true", () => expect(nand(false, true)).toBe(true));
  test("a = true, b = false", () => expect(nand(true, false)).toBe(true));
  test("a = true, b = true", () => expect(nand(true, true)).toBe(false));
});

describe("\nTesting OR", () => {
  test("a = false, b = false", () => expect(or(false, false)).toBe(false));
  test("a = false, b = true", () => expect(or(false, true)).toBe(true));
  test("a = true, b = false", () => expect(or(true, false)).toBe(true));
  test("a = true, b = true", () => expect(or(true, true)).toBe(true));
});

describe("\nTesting XOR", () => {
  test("a = false, b = false", () => expect(xor(false, false)).toBe(false));
  test("a = false, b = true", () => expect(xor(false, true)).toBe(true));
  test("a = true, b = false", () => expect(xor(true, false)).toBe(true));
  test("a = true, b = true", () => expect(xor(true, true)).toBe(false));
});

describe("\nTesting NOR", () => {
  test("a = false, b = false", () => expect(nor(false, false)).toBe(true));
  test("a = false, b = true", () => expect(nor(false, true)).toBe(false));
  test("a = true, b = false", () => expect(nor(true, false)).toBe(false));
  test("a = true, b = true", () => expect(nor(true, true)).toBe(false));
});

const testSrLatch = srLatch();

describe("\nTesting srLatch", () => {
  test("Should initialize to false", () => {
    expect(testSrLatch(false, false)).toBe(false);
  });

  test("Should set to true when set is true", () => {
    expect(testSrLatch(true, false)).toBe(true);
  });

  test("Should reset to false when reset is true", () => {
    expect(testSrLatch(false, true)).toBe(false);
  });

  test("Should maintain state", () => {
    expect(testSrLatch(true, false)).toBe(true);
    expect(testSrLatch(false, false)).toBe(true);
    expect(testSrLatch(false, true)).toBe(false);
    expect(testSrLatch(false, false)).toBe(false);
  });
});

const testDLatch = dLatch();

describe("\nTesting dLatch", () => {
  test("Should initialize to false", () => {
    expect(testDLatch(false, false)).toBe(false);
  });

  test("Shouldn't store if only data is set", () => {
    expect(testDLatch(true, false)).toBe(false);
    expect(testDLatch(false, false)).toBe(false);
  });

  test("Should store if both data and store are set", () => {
    expect(testDLatch(true, true)).toBe(true);
    expect(testDLatch(true, false)).toBe(true);
    expect(testDLatch(false, false)).toBe(true);
  });

  test("Should keep the stored value if data is toggled", () => {
    expect(testDLatch(true, false)).toBe(true);
    expect(testDLatch(false, false)).toBe(true);
    expect(testDLatch(false, true)).toBe(false);
    expect(testDLatch(true, false)).toBe(false);
  });

  test("Should reset if stored is set", () => {
    expect(testDLatch(true, true)).toBe(true);
    expect(testDLatch(false, true)).toBe(false);
    expect(testDLatch(false, false)).toBe(false);
  });
});

const testRegister = fourBitRegister();

describe("\nTesting fourBitRegister", () => {
  test("Should initialize to false", () => {
    expect(testRegister(toBinaryArrayPositive(0), false)).toStrictEqual(
      toBinaryArrayPositive(0)
    );
  });

  test("Shouldn't store if only data is set", () => {
    expect(testRegister(toBinaryArrayPositive(7), false)).toStrictEqual(
      toBinaryArrayPositive(0)
    );
    expect(testRegister(toBinaryArrayPositive(0), false)).toStrictEqual(
      toBinaryArrayPositive(0)
    );
  });

  test("Should store if both data and store are set", () => {
    expect(testRegister(toBinaryArrayPositive(7), true)).toStrictEqual(
      toBinaryArrayPositive(7)
    );
    expect(testRegister(toBinaryArrayPositive(7), false)).toStrictEqual(
      toBinaryArrayPositive(7)
    );
    expect(testRegister(toBinaryArrayPositive(0), false)).toStrictEqual(
      toBinaryArrayPositive(7)
    );
  });

  test("Should keep the stored value if data is toggled", () => {
    expect(testRegister(toBinaryArrayPositive(7), false)).toStrictEqual(
      toBinaryArrayPositive(7)
    );
    expect(testRegister(toBinaryArrayPositive(0), false)).toStrictEqual(
      toBinaryArrayPositive(7)
    );
    expect(testRegister(toBinaryArrayPositive(0), true)).toStrictEqual(
      toBinaryArrayPositive(0)
    );
    expect(testRegister(toBinaryArrayPositive(7), false)).toStrictEqual(
      toBinaryArrayPositive(0)
    );
  });

  test("Should reset if stored is set", () => {
    expect(testRegister(toBinaryArrayPositive(7), true)).toStrictEqual(
      toBinaryArrayPositive(7)
    );
    expect(testRegister(toBinaryArrayPositive(3), true)).toStrictEqual(
      toBinaryArrayPositive(3)
    );
    expect(testRegister(toBinaryArrayPositive(0), false)).toStrictEqual(
      toBinaryArrayPositive(3)
    );
  });
});
