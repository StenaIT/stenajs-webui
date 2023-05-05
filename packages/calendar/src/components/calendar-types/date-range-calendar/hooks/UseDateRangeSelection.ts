import { useMemo, useState } from "react";
import { useDateRangeOnClickDayHandler } from "../../../../features/date-range/hooks/UseDateRangeOnClickDayHandler";
import { DateRangeCalendarProps } from "../DateRangeCalendar";
import { CalendarWithMonthSwitcherProps } from "../../../../features/month-switcher/CalendarWithMonthSwitcher";
import { buildDayStateForDateRange } from "../../../../util/calendar/StateModifier";
import { useInternalPanelState } from "../../../../features/internal-panel-state/UseInternalPanelState";

export const useDateRangeSelection = <T>({
  focusedInput,
  value,
  onValueChange,
  setFocusedInput,
  statePerMonth,
  onChangePanel,
  initialDateInFocus,
}: DateRangeCalendarProps<T>): CalendarWithMonthSwitcherProps<T> => {
  const { currentPanel, setCurrentPanel } =
    useInternalPanelState(onChangePanel);
  const [dateInFocus, setDateInFocus] = useState(
    () => initialDateInFocus ?? new Date()
  );

  const onClickDay = useDateRangeOnClickDayHandler(
    value,
    onValueChange,
    focusedInput,
    setFocusedInput
  );

  const statePerMonthWithSelection = useMemo(
    () =>
      buildDayStateForDateRange(
        statePerMonth,
        value?.startDate,
        value?.endDate
      ),
    [statePerMonth, value?.endDate, value?.startDate]
  );

  return {
    onClickDay,
    statePerMonth: statePerMonthWithSelection,
    currentPanel,
    setCurrentPanel,
    setDateInFocus,
    dateInFocus,
  };
};
