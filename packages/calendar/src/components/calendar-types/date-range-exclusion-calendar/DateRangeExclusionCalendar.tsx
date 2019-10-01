import * as React from "react";
import {
  CalendarWithMonthSwitcher,
  CalendarWithMonthSwitcherProps
} from "../../../features/month-switcher/CalendarWithMonthSwitcher";

import { useDateRangeExclusionSelection } from "./UseDateRangeExclusionSelection";

export interface DateRangeExclusionCalendar<T>
  extends CalendarWithMonthSwitcherProps<T> {
  value: Array<Date> | undefined;
  onChange?: (value: Array<Date>) => void;
}

export function DateRangeExclusionCalendar<T extends {}>(
  props: DateRangeExclusionCalendar<T>
) {
  const selectionProps = useDateRangeExclusionSelection(props);
  return <CalendarWithMonthSwitcher<T> {...props} {...selectionProps} />;
}
