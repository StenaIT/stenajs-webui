export const booleanOrNumberToNumber = (
  num: number | boolean | undefined,
): number => {
  if (num == null) {
    return 0;
  }
  if (typeof num === "boolean") {
    return num ? 1 : 0;
  }
  return num;
};

export const numberToMetricCalc = (num: number): string | undefined => {
  if (num === 0) {
    return undefined;
  }
  return `calc(${num} * var(--swui-metrics-space))`;
};

export const booleanOrNumberToMetricCalc = (
  num: number | boolean | undefined,
): string | undefined => numberToMetricCalc(booleanOrNumberToNumber(num));
