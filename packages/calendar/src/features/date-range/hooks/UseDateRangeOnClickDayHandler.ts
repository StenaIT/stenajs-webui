import { isAfter } from "date-fns";
import { useCallback } from "react";
import { DateRangeFocusedInput } from "../../../components/calendar-types/date-range-calendar/DateRangeCalendar";
import { OnClickDay } from "../../../types/CalendarTypes";
import { DayData } from "../../../util/calendar/CalendarDataFactory";
import { ensureStartIsFirst } from "../../../util/calendar/CalendarIntervalValidator";

export interface DateRangeOnChangeValue {
  startDate?: Date;
  endDate?: Date;
}

export const useDateRangeOnClickDayHandler = <T>(
  startDate: Date | undefined,
  setStartDate: (startDate: Date) => void,
  endDate: Date | undefined,
  setEndDate: (endDate: Date) => void,
  focusedInput: DateRangeFocusedInput,
  setFocusedInput: (focusedInput: DateRangeFocusedInput) => void,
  onChange?: (value: DateRangeOnChangeValue) => void
): OnClickDay<T> => {
  return useCallback(
    (day: DayData) => {
      if (focusedInput === "startDate") {
        if (endDate && isAfter(day.date, endDate)) {
          setStartDate(endDate);
          setEndDate(day.date);
          if (onChange) {
            onChange({ startDate: endDate, endDate: day.date });
          }
        } else {
          setStartDate(day.date);
          setFocusedInput("endDate");
          if (onChange) {
            onChange(
              ensureStartIsFirst({
                startDate: day.date,
                endDate: endDate,
              })
            );
          }
        }
      } else if (focusedInput === "endDate") {
        if (startDate && isAfter(startDate, day.date)) {
          setStartDate(day.date);
          setEndDate(startDate);
          if (onChange) {
            onChange({ startDate: day.date, endDate: startDate });
          }
        } else {
          setEndDate(day.date);
          setFocusedInput("startDate");
          if (onChange) {
            onChange(
              ensureStartIsFirst({
                startDate: startDate,
                endDate: day.date,
              })
            );
          }
        }
      }
    },
    [
      focusedInput,
      endDate,
      startDate,
      setStartDate,
      setEndDate,
      onChange,
      setFocusedInput,
    ]
  );
};
