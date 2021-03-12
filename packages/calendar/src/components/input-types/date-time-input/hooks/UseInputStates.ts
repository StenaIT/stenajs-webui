import { useBoolean } from "@stenajs-webui/core";
import { useState } from "react";
import { DateRangeFocusedInput } from "../../../calendar-types/date-range-calendar/DateRangeCalendar";
import { CalendarPanelType } from "../../../../features/calendar-with-month-year-pickers/CalendarPanelType";

export type UseInputStatesResult = ReturnType<typeof useInputStates>;

export const useInputStates = (date: Date | undefined) => {
  const [localDate, setLocalDate] = useState<Date | undefined>(undefined);
  const [localTime, setLocalTime] = useState<string | undefined>(undefined);

  const [
    isCalendarVisible,
    showCalendarInternal,
    hideCalendarInternal,
  ] = useBoolean(false);

  const [isTimePickerVisible, showTimePicker, hideTimePicker] = useBoolean(
    false
  );

  const [firstFocusedInput, setFirstFocusedInput] = useState<
    DateRangeFocusedInput | undefined
  >(undefined);

  const [dateInFocus, setDateInFocus] = useState<Date>(
    () => date ?? new Date()
  );

  const [currentPanel, setCurrentPanel] = useState<CalendarPanelType>(
    "calendar"
  );

  return {
    isCalendarVisible,
    showCalendarInternal,
    hideCalendarInternal,
    firstFocusedInput,
    setFirstFocusedInput,
    dateInFocus,
    setDateInFocus,
    currentPanel,
    setCurrentPanel,
    isTimePickerVisible,
    showTimePicker,
    hideTimePicker,
    localDate,
    setLocalDate,
    localTime,
    setLocalTime,
  };
};
