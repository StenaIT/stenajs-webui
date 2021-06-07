type ComparableType = number | string | boolean | Date | null | undefined;

export const createMultiTypeComparator = (desc?: boolean) => (
  a: ComparableType,
  b: ComparableType
): number => {
  const up = desc ? -1 : 1;
  if (a != null && b == null) {
    return -1;
  }
  if (a == null && b != null) {
    return 1;
  }
  if (isBothOfType(a, b, "number")) {
    return (Number(a) - Number(b)) * up;
  }
  if (isBothOfType(a, b, "boolean")) {
    return (Number(b) - Number(a)) * up;
  }
  if (isBothOfType(a, b, "string")) {
    if (a !== "" && b === "") {
      return -1;
    }
    if (a === "" && b !== "") {
      return 1;
    }
    return String(a).localeCompare(String(b)) * up;
  }
  if (a instanceof Date && b instanceof Date) {
    return (a.getTime() - b.getTime()) * up;
  }
  return 0;
};

const isBothOfType = (
  a: ComparableType,
  b: ComparableType,
  type: string
): boolean => typeof a === type && typeof b === type;
