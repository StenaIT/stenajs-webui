import * as React from "react";
import {
  CalendarWithMonthSwitcher,
  CalendarWithMonthSwitcherProps,
} from "../../../features/month-switcher/CalendarWithMonthSwitcher";

import { useDateRangeExclusionSelection } from "./UseDateRangeExclusionSelection";

export interface DateRangeExclusionCalendarProps<T>
  extends Omit<
    CalendarWithMonthSwitcherProps<T>,
    "currentPanel" | "setCurrentPanel" | "dateInFocus" | "setDateInFocus"
  > {
  value?: Array<Date>;
  onChange?: (value: Array<Date>) => void;
}

export function DateRangeExclusionCalendar<T extends {}>(
  props: DateRangeExclusionCalendarProps<T>
) {
  const selectionProps = useDateRangeExclusionSelection(props);
  return <CalendarWithMonthSwitcher<T> {...props} {...selectionProps} />;
}
