export const truthyKeysAsList = (r: Record<string, boolean>): Array<string> =>
  Object.keys(r).filter((key) => r[key]);
