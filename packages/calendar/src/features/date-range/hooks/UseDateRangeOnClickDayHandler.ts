import { useCallback } from "react";
import { DateRangeFocusedInput } from "../../../components/calendar-types/date-range-calendar/DateRangeCalendar";
import { OnClickDay } from "../../../types/CalendarTypes";
import { DayData } from "../../../util/calendar/CalendarDataFactory";
import {
  isDateRangeInvalid,
  toggleDatesIfEndIsEarlierThanStart,
} from "../../../util/date-range/DateRangeValidator";
import { DateRange } from "../../../types/DateRange";

export const useDateRangeOnClickDayHandler = <T>(
  value: DateRange | undefined,
  onValueChange: ((dateRange: DateRange) => void) | undefined,
  focusedInput: DateRangeFocusedInput,
  setFocusedInput: (focusedInput: DateRangeFocusedInput) => void
): OnClickDay<T> => {
  return useCallback(
    (day: DayData) => {
      const dateRange = {
        startDate: focusedInput === "startDate" ? day.date : value?.startDate,
        endDate: focusedInput === "endDate" ? day.date : value?.endDate,
      };

      if (!isDateRangeInvalid(dateRange)) {
        setFocusedInput(focusedInput === "startDate" ? "endDate" : "startDate");
      }
      onValueChange?.(toggleDatesIfEndIsEarlierThanStart(dateRange));
    },
    [
      focusedInput,
      onValueChange,
      setFocusedInput,
      value?.endDate,
      value?.startDate,
    ]
  );
};
