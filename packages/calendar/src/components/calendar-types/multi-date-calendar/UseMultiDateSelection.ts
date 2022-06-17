import { isSameDay } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { OnClickDay } from "../../../types/CalendarTypes";
import { addDayStateHighlights } from "../../../util/calendar/StateModifier";
import { MultiDateCalendarProps } from "./MultiDateCalendar";
import { CalendarWithMonthSwitcherProps } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { useInternalPanelState } from "../../../features/internal-panel-state/UseInternalPanelState";

export const useMultiDateSelection = <T>({
  onChange,
  value,
  statePerMonth,
  onChangePanel,
}: MultiDateCalendarProps<T>): CalendarWithMonthSwitcherProps<T> => {
  const { currentPanel, setCurrentPanel } = useInternalPanelState(
    onChangePanel
  );

  const [dateInFocus, setDateInFocus] = useState(() => new Date());

  const onClickDay: OnClickDay<T> = useCallback(
    (day) => {
      if (!onChange) {
        return;
      }
      const isSelected = value && value.find((d) => isSameDay(d, day.date));
      if (value && isSelected) {
        onChange(value.filter((v) => !isSameDay(v, day.date)));
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
    statePerMonth: statePerMonthWithSelectedDate,
    currentPanel,
    setCurrentPanel,
    dateInFocus,
    setDateInFocus,
  };
};
