import * as React from "react";
import {
  CalendarWithMonthSwitcher,
  CalendarWithMonthSwitcherProps
} from "../../../features/month-switcher/CalendarWithMonthSwitcher";

import { useDateRangeSelection } from "./hooks/UseDateRangeSelection";

export type DateRangeFocusedInput = "startDate" | "endDate" | undefined;

export interface DateRangeCalendarOnChangeValue {
  startDate?: Date;
  endDate?: Date;
}

export interface DateRangeCalendarProps<T>
  extends CalendarWithMonthSwitcherProps<T> {
  startDate: Date | undefined;
  endDate: Date | undefined;
  focusedInput?: DateRangeFocusedInput;
  setStartDate: (startDate: Date) => void;
  setEndDate: (endDate: Date) => void;
  setFocusedInput: (focusedInput: DateRangeFocusedInput) => void;
  /** onChange handler for when the user selects a date. */
  onChange?: (value: DateRangeCalendarOnChangeValue) => void;
}

export function DateRangeCalendar<T extends {}>(
  props: DateRangeCalendarProps<T>
) {
  const dateRangeSelectionProps = useDateRangeSelection(props);
  return (
    <CalendarWithMonthSwitcher<T> {...props} {...dateRangeSelectionProps} />
  );
}
