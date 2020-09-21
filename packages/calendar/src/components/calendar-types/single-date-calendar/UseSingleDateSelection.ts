import { useCallback, useMemo, useState } from "react";
import { OnClickDay } from "../../../types/CalendarTypes";
import { addDayStateHighlights } from "../../../util/calendar/StateModifier";
import { SingleDateCalendarProps } from "./SingleDateCalendar";
import { CalendarWithMonthSwitcherProps } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { CalendarPanelType } from "../../../features/calendar-with-month-year-pickers/CalendarPanelType";

export const useSingleDateSelection = <T>({
  onChange,
  value,
  statePerMonth,
}: SingleDateCalendarProps<T>): CalendarWithMonthSwitcherProps<T> => {
  const [currentPanel, setCurrentPanel] = useState<CalendarPanelType>(
    "calendar"
  );

  const [dateInFocus, setDateInFocus] = useState(() => new Date());

  const onClickDay: OnClickDay<T> = useCallback(
    (day) => {
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
    date: value,
    currentPanel,
    setCurrentPanel,
    dateInFocus,
    setDateInFocus,
  };
};
