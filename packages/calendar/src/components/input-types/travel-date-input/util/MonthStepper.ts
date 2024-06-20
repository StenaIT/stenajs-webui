import {
  getMonthInYear,
  MonthData,
} from "../../../../util/calendar/CalendarDataFactory";
import { addMonths, subMonths } from "date-fns";

export const getPrevMonth = (month: MonthData, locale: Locale): MonthData => {
  const d = subMonths(new Date(month.year, month.monthInYear), 1);
  return getMonthInYear(d.getFullYear(), d.getMonth(), locale);
};

export const getNextMonth = (month: MonthData, locale: Locale): MonthData => {
  const d = addMonths(new Date(month.year, month.monthInYear), 1);
  return getMonthInYear(d.getFullYear(), d.getMonth(), locale);
};
