import { useMemo } from "react";
import { useDateRangeOnClickDayHandler } from "../../../../features/date-range/hooks/UseDateRangeOnClickDayHandler";
import { CalendarProps } from "../../../../types/CalendarTypes";
import { DateRangeCalendarProps } from "../DateRangeCalendar";
import { buildDayState } from "../util/DayStateFactory";
import { toggleDatesIfEndIsEarlierThanStart } from "../util/IntervalSwitcher";

export const useDateRangeSelection = <T>({
  focusedInput,
  endDate,
  startDate,
  setStartDate,
  setEndDate,
  onChange,
  setFocusedInput,
  statePerMonth,
}: DateRangeCalendarProps<T>): CalendarProps<T> => {
  const onClickDay = useDateRangeOnClickDayHandler(
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    focusedInput,
    setFocusedInput,
    onChange
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
    statePerMonth: statePerMonthWithSelection,
  };
};
