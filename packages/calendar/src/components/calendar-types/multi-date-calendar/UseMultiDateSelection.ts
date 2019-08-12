import { useCallback, useMemo } from "react";
import {
  CalendarProps,
  CalendarState,
  OnClickDay
} from "../../../types/CalendarTypes";
import { addDayStateHighlights } from "../../../util/calendar/StateModifier";
import {
  listContainsDate,
  removeDateIfExist
} from "../../../util/date/DateListTools";
import { MultiDateCalendarProps } from "./MultiDateCalendar";

export const useMultiDateSelection = <T>({
  onChange,
  value,
  statePerMonth
}: MultiDateCalendarProps<T>): Partial<CalendarProps<T>> => {
  const onClickDay: OnClickDay<T> = useCallback(
    day => {
      if (onChange) {
        if (!value) {
          onChange([day.date]);
        } else if (listContainsDate(value, day.date)) {
          onChange(removeDateIfExist(value, day.date));
        } else {
          onChange([...value, day.date]);
        }
      }
    },
    [onChange]
  );
  const statePerMonthWithSelectedDate = useMemo(() => {
    return addHighlighting(statePerMonth, value);
  }, [statePerMonth, value]);

  return {
    onClickDay,
    statePerMonth: statePerMonthWithSelectedDate
  };
};

const addHighlighting = (
  statePerMonth: CalendarState | undefined,
  dateList: Array<Date> | undefined
): CalendarState | undefined => {
  if (!dateList) {
    return statePerMonth;
  }
  return dateList.reduce((statePerMonth, date) => {
    return addDayStateHighlights(statePerMonth, date, ["selected"]);
  }, statePerMonth);
};
