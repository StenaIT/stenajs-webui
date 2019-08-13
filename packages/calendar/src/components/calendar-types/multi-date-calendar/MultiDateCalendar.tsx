import * as React from "react";
import {
  CalendarWithMonthSwitcher,
  CalendarWithMonthSwitcherProps
} from "../../../features/month-switcher/CalendarWithMonthSwitcher";

import { useMultiDateSelection } from "./UseMultiDateSelection";

export interface MultiDateCalendarProps<T>
  extends CalendarWithMonthSwitcherProps<T> {
  value: Array<Date> | undefined;
  onChange?: (value: Array<Date>) => void;
}

export function MultiDateCalendar<T extends {}>(
  props: MultiDateCalendarProps<T>
) {
  const singleDateSelectionProps = useMultiDateSelection(props);
  return (
    <CalendarWithMonthSwitcher<T> {...props} {...singleDateSelectionProps} />
  );
}
