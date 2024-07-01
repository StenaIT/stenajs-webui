import {
  addDays,
  addHours,
  addMonths,
  format,
  startOfWeek,
  subDays,
  subMonths,
} from "date-fns";
import { DateFormats } from "../../../../util/date/DateFormats";

export const createDayId = (date: Date) => {
  return format(addHours(date, 12), DateFormats.fullDate);
};

export const getDateToFocusOn = (
  currentDate: Date,
  key: string
): Date | undefined => {
  switch (key) {
    case "PageUp":
      return subMonths(currentDate, 1);
    case "PageDown":
      return addMonths(currentDate, 1);
    case "Home":
      return startOfWeek(currentDate);
    case "End":
      return addDays(startOfWeek(currentDate), 6);
    case "ArrowLeft":
      return subDays(currentDate, 1);
    case "ArrowUp":
      return subDays(currentDate, 7);
    case "ArrowRight":
      return addDays(currentDate, 1);
    case "ArrowDown":
      return addDays(currentDate, 7);
    default:
      return undefined;
  }
};
