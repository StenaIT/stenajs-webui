import { ZipCelXCell } from "zipcelx";
import { format } from "date-fns";

export const transformItemToCell = <TValue>(
  value: TValue,
  label: string | undefined,
  formatted?: string | number
): ZipCelXCell => {
  if (formatted != null) {
    return createCell(formatted);
  }

  if (label) {
    return createCell(label);
  }

  if (typeof value === "number" || typeof value === "string") {
    return createCell(value);
  }

  if (value instanceof Date) {
    return createCell(format(value, "yyyy-MM-dd HH:mm"));
  }

  return createCell(String(value));
};

const createCell = (value: string | number): ZipCelXCell => {
  const type = typeof value === "number" ? "number" : "string";
  return {
    type,
    value,
  };
};
