import * as React from "react";
import {
  CalendarWithMonthSwitcher,
  CalendarWithMonthSwitcherProps,
} from "../../../features/month-switcher/CalendarWithMonthSwitcher";

import { useSingleWeekSelection } from "./UseSingleWeekSelection";

export type SingleWeekValue = string;

export interface SingleWeekCalendarProps<T>
  extends CalendarWithMonthSwitcherProps<T> {
  value: SingleWeekValue | undefined;
  onChange: (value: SingleWeekValue | undefined) => void;
}

export function SingleWeekCalendar<T>(props: SingleWeekCalendarProps<T>) {
  const singleWeekSelectionProps = useSingleWeekSelection(props);
  return (
    <CalendarWithMonthSwitcher<T> {...props} {...singleWeekSelectionProps} />
  );
}
