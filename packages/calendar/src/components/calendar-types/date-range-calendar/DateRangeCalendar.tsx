import * as React from "react";
import { CalendarWithMonthSwitcher } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { useDateRangeSelection } from "./hooks/UseDateRangeSelection";
import { InternalPanelAndFocusStateProps } from "../../../types/InternalPanelAndFocusStateProps";

export type DateRangeFocusedInput = "startDate" | "endDate" | undefined;

export interface DateRangeCalendarOnChangeValue {
  startDate?: Date;
  endDate?: Date;
}

export interface DateRangeCalendarProps<T>
  extends InternalPanelAndFocusStateProps<T> {
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

export type DateRangeInputCalendarProps<T> = Omit<
  DateRangeCalendarProps<T>,
  | "startDateInFocus"
  | "onChange"
  | "startDate"
  | "endDate"
  | "setStartDate"
  | "setEndDate"
  | "focusedInput"
  | "setFocusedInput"
  | "theme"
  | "currentPanel"
  | "setCurrentPanel"
>;
