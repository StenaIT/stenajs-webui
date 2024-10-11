import { isAfter, isBefore, isSameDay } from "date-fns";

export const isDateInMinMaxRange = (
  date: Date,
  min: Date | undefined,
  max: Date | undefined,
): boolean => {
  if (min && isBefore(date, min)) {
    return isSameDay(date, min);
  }
  if (max && isAfter(date, max)) {
    return isSameDay(date, max);
  }
  return true;
};
