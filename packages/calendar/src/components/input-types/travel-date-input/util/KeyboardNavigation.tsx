import { addDays, addHours, format, subDays } from "date-fns";
import { DateFormats } from "../../../../util/date/DateFormats";

export const createDayId = (date: Date) => {
  return format(addHours(date, 12), DateFormats.fullDate);
};

export const getDateToFocusOn = (
  currentDate: Date,
  key: string
): Date | undefined => {
  switch (key) {
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
