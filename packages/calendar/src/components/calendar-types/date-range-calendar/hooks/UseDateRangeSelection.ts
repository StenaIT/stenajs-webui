import { useMemo, useState } from "react";
import { useDateRangeOnClickDayHandler } from "../../../../features/date-range/hooks/UseDateRangeOnClickDayHandler";
import { DateRangeCalendarProps } from "../DateRangeCalendar";
import { buildDayState } from "../util/DayStateFactory";
import { toggleDatesIfEndIsEarlierThanStart } from "../util/IntervalSwitcher";
import { CalendarWithMonthSwitcherProps } from "../../../../features/month-switcher/CalendarWithMonthSwitcher";
import { CalendarPanelType } from "../../../../features/calendar-with-month-year-pickers/CalendarPanelType";

export const useDateRangeSelection = <T>({
  focusedInput,
  endDate,
  startDate,
  setStartDate,
  setEndDate,
  onChange,
  setFocusedInput,
  statePerMonth,
}: DateRangeCalendarProps<T>): CalendarWithMonthSwitcherProps<T> => {
  const [currentPanel, setCurrentPanel] = useState<CalendarPanelType>(
    "calendar"
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
    () => buildDayState(statePerMonth, dates.startDate, dates.endDate),
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
