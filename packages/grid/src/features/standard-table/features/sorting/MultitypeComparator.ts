export type ComparableType =
  | number
  | string
  | boolean
  | Date
  | null
  | undefined;

export const multitypeComparator = (
  a: ComparableType,
  b: ComparableType
): number => {
  if (a != null && b == null) {
    return -1;
  }
  if (a == null && b != null) {
    return 1;
  }
  if (isBothOfType(a, b, "number")) {
    return Number(a) - Number(b);
  }
  if (isBothOfType(a, b, "boolean")) {
    return Number(b) - Number(a);
  }
  if (isBothOfType(a, b, "string")) {
    return String(a).localeCompare(String(b));
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime();
  }
  return 0;
};

const isBothOfType = (
  a: ComparableType,
  b: ComparableType,
  type: string
): boolean => typeof a === type && typeof b === type;
