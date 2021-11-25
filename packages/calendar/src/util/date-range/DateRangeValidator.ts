import { isAfter, isSameDay } from "date-fns";
import { DateRange, DateStringRange } from "../../types/DateRange";
import { dateRangeToStrings, stringsToDateRange } from "./DateRangeTransformer";

export const isDateRangeInvalid = ({
  startDate,
  endDate,
}: DateRange): boolean =>
  Boolean(
    startDate &&
      endDate &&
      !isSameDay(startDate, endDate) &&
      isAfter(startDate, endDate)
  );

export const toggleDatesIfEndIsEarlierThanStart = (
  dateRange: DateRange
): DateRange => {
  if (isDateRangeInvalid(dateRange)) {
    return {
      startDate: dateRange.endDate,
      endDate: dateRange.startDate,
    };
  }
  return dateRange;
};

export const toggleDateStringsIfEndIsEarlierThanStart = (
  dateRange: DateStringRange
): DateStringRange => {
  if (dateRange.startDate && dateRange.endDate) {
    return dateRangeToStrings(
      toggleDatesIfEndIsEarlierThanStart(stringsToDateRange(dateRange))
    );
  }
  return dateRange;
};
