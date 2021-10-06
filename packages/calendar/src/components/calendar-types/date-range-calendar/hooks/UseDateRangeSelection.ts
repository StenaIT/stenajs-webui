import { useMemo, useState } from "react";
import { useDateRangeOnClickDayHandler } from "../../../../features/date-range/hooks/UseDateRangeOnClickDayHandler";
import { DateRangeCalendarProps } from "../DateRangeCalendar";
import { toggleDatesIfEndIsEarlierThanStart } from "../util/IntervalSwitcher";
import { CalendarWithMonthSwitcherProps } from "../../../../features/month-switcher/CalendarWithMonthSwitcher";
import { buildDayStateForDateRange } from "../../../../util/calendar/StateModifier";
import { useInternalPanelState } from "../../../../features/internal-panel-state/UseInternalPanelState";

export const useDateRangeSelection = <T>({
  focusedInput,
  endDate,
  startDate,
  setStartDate,
  setEndDate,
  onChange,
  setFocusedInput,
  statePerMonth,
  onChangePanel,
}: DateRangeCalendarProps<T>): CalendarWithMonthSwitcherProps<T> => {
  const { currentPanel, setCurrentPanel } = useInternalPanelState(
    onChangePanel
  );
  const [dateInFocus, setDateInFocus] = useState(() => new Date());

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
    () =>
      buildDayStateForDateRange(statePerMonth, dates.startDate, dates.endDate),
    [statePerMonth, dates]
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
