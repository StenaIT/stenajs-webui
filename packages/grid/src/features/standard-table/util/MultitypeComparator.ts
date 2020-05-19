type ComparableType = number | string | boolean | Date | null | undefined;

export const multitypeComparator = (
  a: ComparableType,
  b: ComparableType
): number => {
  if (a && b == null) {
    return -1;
  }
  if (a == null && b) {
    return 1;
  }
  if (isTypeOrUndefined(a, b, "number")) {
    return Number(a) - Number(b);
  }
  if (isTypeOrUndefined(a, b, "boolean")) {
    return Number(b) - Number(a);
  }
  if (isTypeOrUndefined(a, b, "string")) {
    return String(a).localeCompare(String(b));
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime();
  }
  return 0;
};

const isTypeOrUndefined = (a: any, b: any, type: string): boolean => {
  if (typeof a === type && typeof b === type) {
    return true;
  }
  if (typeof a === type && b == null) {
    return true;
  }
  if (a === null && typeof b == type) {
    return true;
  }
  return false;
};
