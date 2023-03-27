export const and = (a: boolean, b: boolean) => a && b;
export const not = (a: boolean) => !a;
export const nand = (a: boolean, b: boolean) => not(and(a, b));
export const or = (a: boolean, b: boolean) => nand(not(a), not(b));
export const xor = (a: boolean, b: boolean) => and(nand(a, b), or(a, b));
