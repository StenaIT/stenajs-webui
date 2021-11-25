import { useCallback } from "react";
import { DateRangeFocusedInput } from "../../../components/calendar-types/date-range-calendar/DateRangeCalendar";
import { OnClickDay } from "../../../types/CalendarTypes";
import { DayData } from "../../../util/calendar/CalendarDataFactory";
import { toggleDatesIfEndIsEarlierThanStart } from "../../../util/date-range/IntervalSwitcher";
import { DateRange } from "../../../types/DateRange";
import { isAfter } from "date-fns";

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

      const isInvalidRange = Boolean(
        dateRange.startDate &&
          dateRange.endDate &&
          isAfter(dateRange.startDate, dateRange.endDate)
      );

      const validDateRange = toggleDatesIfEndIsEarlierThanStart(dateRange);

      if (!isInvalidRange) {
        setFocusedInput(focusedInput === "startDate" ? "endDate" : "startDate");
      }
      onValueChange?.(validDateRange);
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
