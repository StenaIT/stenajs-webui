import { DateRange, DateStringRange } from "../../types/DateRange";
import { format, parse } from "date-fns";

export const dateRangeToStrings = (dateRange: DateRange): DateStringRange => ({
  startDate: dateRange.startDate
    ? format(dateRange.startDate, "yyyy-MM-dd")
    : undefined,
  endDate: dateRange.endDate
    ? format(dateRange.endDate, "yyyy-MM-dd")
    : undefined,
});

export const stringsToDateRange = ({
  startDate,
  endDate,
}: DateStringRange): DateRange => {
  const now = new Date();
  return {
    startDate: startDate ? parse(startDate, "yyyy-MM-dd", now) : undefined,
    endDate: endDate ? parse(endDate, "yyyy-MM-dd", now) : undefined,
  };
};
