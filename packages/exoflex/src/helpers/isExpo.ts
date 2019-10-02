type ExpoGlobal = typeof global & {
  Expo?: {};
  __expo?: {};
  __exponent?: {};
};

let getExpoRoot = () =>
  (global as ExpoGlobal).Expo ||
  (global as ExpoGlobal).__expo ||
  (global as ExpoGlobal).__exponent;

export let isExpo = () => getExpoRoot() !== undefined;
