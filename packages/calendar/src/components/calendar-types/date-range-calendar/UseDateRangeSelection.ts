import { isAfter } from "date-fns";
import { useCallback, useMemo } from "react";
import { CalendarProps } from "../../../types/CalendarTypes";
import { DayData } from "../../../util/calendar/CalendarDataFactory";
import { ensureStartIsFirst } from "../../../util/calendar/CalendarIntervalValidator";
import { DateRangeCalendarProps } from "./DateRangeCalendar";
import { buildDayState } from "./util/DayStateFactory";
import { toggleDatesIfEndIsEarlierThanStart } from "./util/IntervalSwitcher";

export const useDateRangeSelection = <T>({
  focusedInput,
  endDate,
  startDate,
  setStartDate,
  setEndDate,
  onChange,
  setFocusedInput,
  statePerMonth
}: DateRangeCalendarProps<T>): CalendarProps<T> => {
  const onClickDay = useCallback(
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
                endDate: endDate
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
                endDate: day.date
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
      setFocusedInput
    ]
  );

  const dates = useMemo(
    () => toggleDatesIfEndIsEarlierThanStart(startDate, endDate),
    [startDate, endDate]
  );

  const statePerMonthWithSelection = useMemo(
    () => buildDayState(statePerMonth, dates.startDate, dates.endDate),
    [statePerMonth, dates]
  );

  return {
    onClickDay,
    statePerMonth: statePerMonthWithSelection
  };
};
