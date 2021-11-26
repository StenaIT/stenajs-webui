import { eachDayOfInterval } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { useDateRangeOnClickDayHandler } from "../../../features/date-range/hooks/UseDateRangeOnClickDayHandler";
import { CalendarState, OnClickDay } from "../../../types/CalendarTypes";
import { addDayStateHighlights } from "../../../util/calendar/StateModifier";
import {
  listContainsDate,
  removeDateIfExist,
} from "../../../util/date/DateListTools";
import { DateRangeFocusedInput } from "../date-range-calendar/DateRangeCalendar";
import { DateRangeExclusionCalendarProps } from "./DateRangeExclusionCalendar";
import { CalendarWithMonthSwitcherProps } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { useInternalPanelState } from "../../../features/internal-panel-state/UseInternalPanelState";
import { DateRange } from "../../../types/DateRange";

export const useDateRangeExclusionSelection = <T>({
  value,
  onValueChange,
  statePerMonth,
  onChangePanel,
}: DateRangeExclusionCalendarProps<T>): CalendarWithMonthSwitcherProps<T> => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [focusedInput, setFocusedInput] = useState<DateRangeFocusedInput>(
    "startDate"
  );
  const { currentPanel, setCurrentPanel } = useInternalPanelState(
    onChangePanel
  );

  const [dateInFocus, setDateInFocus] = useState(
    () => (focusedInput && value?.[focusedInput]) ?? new Date()
  );

  const onChangeHandler = useCallback(
    (value: DateRange) => {
      setDateRange(value);
      const { startDate, endDate } = value;
      if (onValueChange) {
        if (startDate && endDate) {
          const dates = eachDayOfInterval({ start: startDate, end: endDate });
          onValueChange(dates);
        } else if (startDate) {
          onValueChange([startDate]);
        } else if (endDate) {
          onValueChange([endDate]);
        }
      }
    },
    [onValueChange]
  );

  const onClickDayRange = useDateRangeOnClickDayHandler(
    dateRange,
    onChangeHandler,
    focusedInput,
    setFocusedInput
  );

  const onClickDay: OnClickDay<T> = useCallback(
    (day, userData, ev) => {
      if (onValueChange) {
        if (ev.ctrlKey || ev.metaKey) {
          if (!value) {
            onValueChange([day.date]);
          } else if (listContainsDate(value, day.date)) {
            onValueChange(removeDateIfExist(value, day.date));
          } else {
            onValueChange([...value, day.date]);
          }
        } else {
          onClickDayRange(day, userData, ev);
        }
      }
    },
    [onValueChange, onClickDayRange, value]
  );
  const statePerMonthWithSelectedDate = useMemo(() => {
    return addHighlighting(statePerMonth, value);
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
