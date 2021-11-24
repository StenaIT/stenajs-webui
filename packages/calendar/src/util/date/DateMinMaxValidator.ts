import { isAfter, isBefore, isSameDay } from "date-fns";

export const isDateInMinMaxRange = (
  date: Date,
  min: Date | undefined,
  max: Date | undefined
): boolean => {
  if (min) {
    if (isBefore(date, min)) {
      return isSameDay(date, min);
    }
  }
  if (max) {
    if (isAfter(date, max)) {
      return isSameDay(date, max);
    }
  }
  return true;
};
