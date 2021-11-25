import { isAfter } from "date-fns";
import { DateRange, DateStringRange } from "../../types/DateRange";
import { dateRangeToStrings, stringsToDateRange } from "./DateRangeTransformer";

export const toggleDatesIfEndIsEarlierThanStart = ({
  startDate,
  endDate,
}: DateRange): DateRange => {
  if (startDate && endDate && isAfter(startDate, endDate)) {
    return {
      startDate: endDate,
      endDate: startDate,
    };
  }
  return {
    startDate,
    endDate,
  };
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
