import { useCallback, useState } from "react";
import {
  DateRangeCalendarOnChangeValue,
  DateRangeFocusedInput
} from "../../../calendar-types/date-range-calendar/DateRangeCalendar";

export const useDateRangeInput = (
  value: DateRangeCalendarOnChangeValue,
  onChange: (dateRange: DateRangeCalendarOnChangeValue) => void
) => {
  const [showingCalendar, setShowingCalendar] = useState(false);
  const [showingFocusHighlight, setShowingFocusHighlight] = useState(false);
  const [focusedInput, setFocusedInput] = useState<
    DateRangeFocusedInput | undefined
  >(undefined);

  const showCalendarStartDate = useCallback(() => {
    setFocusedInput("startDate");
    setShowingCalendar(true);
    setShowingFocusHighlight(true);
    return true;
  }, [setFocusedInput, setShowingCalendar, setShowingFocusHighlight]);

  const showCalendarEndDate = useCallback(() => {
    setFocusedInput("endDate");
    setShowingCalendar(true);
    setShowingFocusHighlight(true);
    return true;
  }, [setFocusedInput, setShowingCalendar, setShowingFocusHighlight]);

  const hideCalendar = useCallback(() => {
    setShowingCalendar(false);
    setShowingFocusHighlight(false);
  }, [setShowingCalendar, setShowingFocusHighlight]);

  const setStartDate = useCallback(
    (startDate: Date) => {
      if (onChange) {
        onChange({ startDate, endDate: value.endDate });
      }
      if (focusedInput === "endDate") {
        setShowingFocusHighlight(false);
        setTimeout(() => setShowingCalendar(false), 150);
      }
    },
    [onChange, focusedInput, value.endDate]
  );

  const setEndDate = useCallback(
    (endDate: Date) => {
      if (onChange) {
        onChange({ startDate: value.startDate, endDate });
      }
      if (focusedInput === "endDate") {
        setShowingFocusHighlight(false);
        setTimeout(() => setShowingCalendar(false), 150);
      }
    },
    [onChange, focusedInput, value.startDate]
  );

  const onSelectDateRange = useCallback(
    (dateRange: DateRangeCalendarOnChangeValue) => {
      if (onChange) {
        onChange(dateRange);
      }
    },
    [onChange]
  );

  return {
    showingCalendar,
    showingFocusHighlight,
    setStartDate,
    setEndDate,
    hideCalendar,
    showCalendarEndDate,
    showCalendarStartDate,
    onSelectDateRange,
    focusedInput,
    setFocusedInput
  };
};
