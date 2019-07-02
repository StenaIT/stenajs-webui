export const parseFloatElseUndefined = (s: string): number | undefined => {
  try {
    const f = parseFloat(s);
    if (isNaN(f)) {
      return undefined;
    }
    if (f == null) {
      return undefined;
    }
    return f;
  } catch (e) {}
  return undefined;
};
