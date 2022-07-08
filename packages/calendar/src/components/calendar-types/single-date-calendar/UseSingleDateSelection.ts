import { useCallback, useMemo, useState } from "react";
import { OnClickDay } from "../../../types/CalendarTypes";
import { addDayStateHighlights } from "../../../util/calendar/StateModifier";
import { SingleDateCalendarProps } from "./SingleDateCalendar";
import { CalendarWithMonthSwitcherProps } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { useInternalPanelState } from "../../../features/internal-panel-state/UseInternalPanelState";

export const useSingleDateSelection = <T>({
  onChange,
  value,
  statePerMonth,
  onChangePanel,
}: SingleDateCalendarProps<T>): CalendarWithMonthSwitcherProps<T> => {
  const { currentPanel, setCurrentPanel } =
    useInternalPanelState(onChangePanel);

  const [dateInFocus, setDateInFocus] = useState(() => value ?? new Date());

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
        ? addDayStateHighlights(statePerMonth, value, [
            "selected",
            "singleSelected",
          ])
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
