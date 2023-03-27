import { and, not, nand, or, xor, nor, srLatch, dLatch } from "../utils/Logic";

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

const testLatch = srLatch();

describe("\nTesting srLatch", () => {
  test("Should initialize to false", () => {
    expect(testLatch(false, false)).toBe(false);
  });

  test("Should set to true when set is true", () => {
    expect(testLatch(true, false)).toBe(true);
  });

  test("Should reset to false when reset is true", () => {
    expect(testLatch(false, true)).toBe(false);
  });

  test("Should maintain state", () => {
    expect(testLatch(true, false)).toBe(true);
    expect(testLatch(false, false)).toBe(true);
    expect(testLatch(false, true)).toBe(false);
    expect(testLatch(false, false)).toBe(false);
  });
});

describe("\nTesting dLatch", () => {
  test("Should initialize to false", () => {
    expect(dLatch(false, false, testLatch)).toBe(false);
  });

  test("Shouldn't store if only data is set", () => {
    expect(dLatch(true, false, testLatch)).toBe(false);
    expect(dLatch(false, false, testLatch)).toBe(false);
  });

  test("Should store if both data and store are set", () => {
    expect(dLatch(true, true, testLatch)).toBe(true);
    expect(dLatch(true, false, testLatch)).toBe(true);
    expect(dLatch(false, false, testLatch)).toBe(true);
  });

  test("Should keep the stored value if data is toggled", () => {
    expect(dLatch(true, false, testLatch)).toBe(true);
    expect(dLatch(false, false, testLatch)).toBe(true);
    expect(dLatch(false, true, testLatch)).toBe(false);
    expect(dLatch(true, false, testLatch)).toBe(false);
  });

  test("Should reset if stored is set", () => {
    expect(dLatch(true, true, testLatch)).toBe(true);
    expect(dLatch(false, true, testLatch)).toBe(false);
    expect(dLatch(false, false, testLatch)).toBe(false);
  });
});
