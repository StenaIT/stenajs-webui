import * as React from "react";
import { CalendarWithMonthSwitcher } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { useSingleWeekSelection } from "./UseSingleWeekSelection";
import { InternalPanelAndFocusStateProps } from "../../../types/InternalPanelAndFocusStateProps";

export type SingleWeekValue = string;

export interface SingleWeekCalendarProps<T>
  extends InternalPanelAndFocusStateProps<T> {
  value: SingleWeekValue | undefined;
  onChange: (value: SingleWeekValue | undefined) => void;
}

export function SingleWeekCalendar<T>(props: SingleWeekCalendarProps<T>) {
  const singleWeekSelectionProps = useSingleWeekSelection(props);
  return (
    <CalendarWithMonthSwitcher<T> {...props} {...singleWeekSelectionProps} />
  );
}
