import * as React from "react";
import { CalendarWithMonthSwitcher } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { useDateRangeSelection } from "./hooks/UseDateRangeSelection";
import { InternalPanelAndFocusStateProps } from "../../../types/InternalPanelAndFocusStateProps";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { DateRange } from "../../../types/DateRange";

export type DateRangeFocusedInput = "startDate" | "endDate";

export interface DateRangeCalendarProps<T>
  extends InternalPanelAndFocusStateProps<T>,
    ValueAndOnValueChangeProps<DateRange> {
  focusedInput?: DateRangeFocusedInput | undefined;
  setFocusedInput: (focusedInput: DateRangeFocusedInput) => void;
  initialDateInFocus?: Date;
}

export function DateRangeCalendar<T>(props: DateRangeCalendarProps<T>) {
  const dateRangeSelectionProps = useDateRangeSelection(props);
  return (
    <CalendarWithMonthSwitcher<T> {...props} {...dateRangeSelectionProps} />
  );
}

export type DateRangeInputCalendarProps<T> = Omit<
  DateRangeCalendarProps<T>,
  | "startDateInFocus"
  | "value"
  | "onValueChange"
  | "focusedInput"
  | "setFocusedInput"
  | "theme"
  | "currentPanel"
  | "setCurrentPanel"
>;
