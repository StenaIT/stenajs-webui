import { useState } from "react";
import { DateRangeFocusedInput } from "../DateRangeCalendar";

export const useDateRangeCalendarState = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [focusedInput, setFocusedInput] = useState<DateRangeFocusedInput>(
    "startDate"
  );
  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    focusedInput,
    setFocusedInput
  };
};
