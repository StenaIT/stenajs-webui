import { useCallback, useMemo } from "react";
import { CalendarProps, OnClickDay } from "../../../types/CalendarTypes";
import { addDayStateHighlights } from "../../../util/calendar/StateModifier";
import { SingleDateCalendarProps } from "./SingleDateCalendar";

export const useSingleDateSelection = <T>({
  onChange,
  value,
  statePerMonth
}: SingleDateCalendarProps<T>): Partial<CalendarProps<T>> => {
  const onClickDay: OnClickDay<T> = useCallback(
    day => {
      if (onChange) {
        onChange(day.date);
      }
    },
    [onChange]
  );
  const statePerMonthWithSelectedDate = useMemo(
    () =>
      value
        ? addDayStateHighlights(statePerMonth, value, ["selected"])
        : statePerMonth,
    [statePerMonth, value]
  );

  return {
    onClickDay,
    statePerMonth: statePerMonthWithSelectedDate,
    date: value
  };
};
