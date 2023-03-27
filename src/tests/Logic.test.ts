import { and, not, nand, or, xor } from "../utils/Logic";

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
