import { addHours, format } from "date-fns";
import { DateFormats } from "../../../util/date/DateFormats";

export const createDayId = (date: Date, calendarId: string) => {
  return format(addHours(date, 12), DateFormats.fullDate) + calendarId;
};
