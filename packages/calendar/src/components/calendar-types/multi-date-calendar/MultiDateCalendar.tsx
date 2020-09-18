import * as React from "react";
import {
  CalendarWithMonthSwitcher,
  CalendarWithMonthSwitcherProps,
} from "../../../features/month-switcher/CalendarWithMonthSwitcher";

import { useMultiDateSelection } from "./UseMultiDateSelection";

export interface MultiDateCalendarProps<T>
  extends Omit<
    CalendarWithMonthSwitcherProps<T>,
    "currentPanel" | "setCurrentPanel" | "dateInFocus" | "setDateInFocus"
  > {
  value?: Array<Date>;
  onChange?: (value: Array<Date>) => void;
}

export function MultiDateCalendar<T extends {}>(
  props: MultiDateCalendarProps<T>
) {
  const selectionProps = useMultiDateSelection(props);
  return <CalendarWithMonthSwitcher<T> {...props} {...selectionProps} />;
}
