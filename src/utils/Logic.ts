export const and = (a: boolean, b: boolean) => a && b;
export const not = (a: boolean) => !a;
export const nand = (a: boolean, b: boolean) => not(and(a, b));
export const or = (a: boolean, b: boolean) => nand(not(a), not(b));
export const xor = (a: boolean, b: boolean) => and(nand(a, b), or(a, b));
export const nor = (a: boolean, b: boolean) => not(or(a, b));

export const srLatch = () => {
  let state = false;

  return (set: boolean, reset: boolean) => {
    state = nor(reset, nor(set, state));
    return state;
  };
};

export const dLatch = (
  data: boolean,
  store: boolean,
  latch: (set: boolean, reset: boolean) => boolean
) => latch(and(data, store), and(store, not(data)));
