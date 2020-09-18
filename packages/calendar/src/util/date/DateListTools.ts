import { isSameDay } from "date-fns";

export const addDateIfNotExists = (
  list: Array<Date>,
  date: Date
): Array<Date> => {
  if (list.filter((item) => isSameDay(item, date)).length >= 1) {
    return list;
  }
  return [...list, date];
};

export const removeDateIfExist = (list: Array<Date>, date: Date): Array<Date> =>
  list.filter((item) => !isSameDay(item, date));

export const listContainsDate = (list: Array<Date>, date: Date): boolean =>
  !!list.find((item) => isSameDay(item, date));
