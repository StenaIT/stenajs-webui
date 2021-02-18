import { useBoolean } from "@stenajs-webui/core";
import { useState } from "react";
import { DateRangeFocusedInput } from "../../../components/calendar-types/date-range-calendar/DateRangeCalendar";
import { CalendarPanelType } from "../../calendar-with-month-year-pickers/CalendarPanelType";

export type UseInputStatesResult = ReturnType<typeof useInputStates>;

export const useInputStates = (
  startDate: Date | undefined,
  endDate: Date | undefined
) => {
  const [
    isCalendarVisible,
    showCalendarInternal,
    hideCalendarInternal,
  ] = useBoolean(false);

  const [firstFocusedInput, setFirstFocusedInput] = useState<
    DateRangeFocusedInput | undefined
  >(undefined);

  const [focusedInput, setFocusedInput] = useState<DateRangeFocusedInput>(
    "startDate"
  );

  const [dateInFocus, setDateInFocus] = useState<Date>(() => {
    const fromValue =
      focusedInput === "startDate"
        ? startDate
        : focusedInput === "endDate"
        ? endDate
        : undefined;

    return fromValue ?? new Date();
  });

  const [currentPanel, setCurrentPanel] = useState<CalendarPanelType>(
    "calendar"
  );

  return {
    isCalendarVisible,
    showCalendarInternal,
    hideCalendarInternal,
    firstFocusedInput,
    setFirstFocusedInput,
    focusedInput,
    setFocusedInput,
    dateInFocus,
    setDateInFocus,
    currentPanel,
    setCurrentPanel,
  };
};
