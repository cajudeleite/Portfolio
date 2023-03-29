import { FourBitBinary } from "../types";

/**
 * Performs a logical AND operation between two boolean values
 *
 * @param a The first boolean operand
 * @param b The second boolean operand
 * @returns The result of the logical AND operation between the two operands
 */
export const and = (a: boolean, b: boolean) => a && b;

/**
 * Performs a logical NOT operation on a boolean value
 *
 * @param a The boolean operand to negate
 * @returns The result of the logical NOT operation on the input operand
 */
export const not = (a: boolean) => !a;

/**
 * Performs a logical NAND operation between two boolean values
 *
 * @param a The first boolean operand
 * @param b The second boolean operand
 * @returns The result of the logical NAND operation between the two operands
 */
export const nand = (a: boolean, b: boolean) => not(and(a, b));

/**
 * Performs a logical OR operation between two boolean values
 *
 * @param a The first boolean operand
 * @param b The second boolean operand
 * @returns The result of the logical OR operation between the two operands
 */
export const or = (a: boolean, b: boolean) => nand(not(a), not(b));

/**
 * Performs a logical XOR operation between two boolean values
 *
 * @param a The first boolean operand
 * @param b The second boolean operand
 * @returns The result of the logical XOR operation between the two operands
 */
export const xor = (a: boolean, b: boolean) => and(nand(a, b), or(a, b));

/**
 * Performs a logical NOR operation between two boolean values
 *
 * @param a The first boolean operand
 * @param b The second boolean operand
 * @returns The result of the logical NOR operation between the two operands
 */
export const nor = (a: boolean, b: boolean) => not(or(a, b));

/**
 * Returns a function that implements an SR latch using NOR gates
 * @returns The SR latch function.
 */
export const srLatch = () => {
  // Initialize the state variable to false
  let state = false;

  /**
   * The SR latch function
   *
   * @param set The set input
   * @param reset The reset input
   * @returns The current state of the latch
   */
  return (set: boolean, reset: boolean) => {
    // Compute the new state of the latch using NOR gates
    state = nor(reset, nor(set, state));

    // Return the current state of the latch
    return state;
  };
};

/**
 * Creates a D latch function
 *
 * A D latch is a type of sequential logic circuit that can store one bit of
 * information. The output of a D latch depends on its current state and an
 * input value. When the `store` input is true,
 * the D latch captures the input value and holds it until the `store` input
 * becomes false. The output value is then held until the `store` input becomes
 * true again and a new input value is captured
 *
 * @returns The D latch function
 */
export const dLatch = () => {
  // Create a new SR latch
  const latch = srLatch();

  /**
   * The D latch function
   *
   * @param data The data input value to store in the latch
   * @param store The store input value that controls whether the input value
   * is stored or held
   * @returns The output value of the D latch
   */
  return (data: boolean, store: boolean) =>
    // Pass the appropriate values to the SR latch based on the input values
    latch(and(data, store), and(not(data), store));
};

/**
 * Creates a four-bit register function
 *
 * A four-bit register is a digital circuit that can store a four-bit binary
 * value. It consists of four D latches that store each bit of the input value
 * when the `store` input is true. The output values of the four D latches are
 * combined to produce a four-bit binary value that represents the stored
 * value. The output value is held until the `store` input becomes true again
 * and a new input value is captured
 *
 * @returns The four-bit register function
 */
export const fourBitRegister = () => {
  // Create four D latches
  const latch1 = dLatch();
  const latch2 = dLatch();
  const latch3 = dLatch();
  const latch4 = dLatch();

  /**
   * The four-bit register function
   *
   * @param data The four-bit binary value to store in the register
   * @param store The store input value that controls whether the input value
   * is stored or held
   * @returns The four-bit binary value that represents the stored value
   */
  return (data: FourBitBinary, store: boolean): FourBitBinary => [
    // Store each bit of the input value using the corresponding D latch
    latch1(data[0], store),
    latch2(data[1], store),
    latch3(data[2], store),
    latch4(data[3], store),
  ];
};
