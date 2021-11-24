import { isAfter, isBefore, isSameDay } from "date-fns";

export const isBeforeOrSameDay = (date: Date, isThisBefore: Date): boolean => {
  return isBefore(date, isThisBefore) || isSameDay(date, isThisBefore);
};

export const isAfterOrSameDay = (date: Date, isThisBefore: Date): boolean => {
  return isAfter(date, isThisBefore) || isSameDay(date, isThisBefore);
};
