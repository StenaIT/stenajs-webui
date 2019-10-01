import { isSameDay } from "date-fns";
import { useCallback, useMemo } from "react";
import { CalendarProps, OnClickDay } from "../../../types/CalendarTypes";
import { addDayStateHighlights } from "../../../util/calendar/StateModifier";
import { MultiDateCalendarProps } from "./MultiDateCalendar";

export const useMultiDateSelection = <T>({
  onChange,
  value,
  statePerMonth
}: MultiDateCalendarProps<T>): Partial<CalendarProps<T>> => {
  const onClickDay: OnClickDay<T> = useCallback(
    day => {
      if (!onChange) {
        return;
      }
      const isSelected = value && value.find(d => isSameDay(d, day.date));
      if (value && isSelected) {
        onChange(value.filter(v => !isSameDay(v, day.date)));
      } else {
        onChange([...(value || []), day.date]);
      }
    },
    [onChange, value]
  );
  const statePerMonthWithSelectedDate = useMemo(() => {
    if (!value) {
      return statePerMonth;
    }
    return value.reduce(
      (stateSum, date) => addDayStateHighlights(stateSum, date, ["selected"]),
      statePerMonth
    );
  }, [statePerMonth, value]);

  return {
    onClickDay,
    statePerMonth: statePerMonthWithSelectedDate
  };
};
