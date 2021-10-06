import * as React from "react";
import { CalendarWithMonthSwitcher } from "../../../features/month-switcher/CalendarWithMonthSwitcher";

import { useSingleDateSelection } from "./UseSingleDateSelection";
import { CalendarWithInternalPanelAndFocusStateProps } from "../../../types/CalendarWithInternalPanelAndFocusStateProps";

export interface SingleDateCalendarProps<T>
  extends CalendarWithInternalPanelAndFocusStateProps<T> {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
}

export function SingleDateCalendar<T extends {}>(
  props: SingleDateCalendarProps<T>
) {
  const singleDateSelectionProps = useSingleDateSelection(props);
  return (
    <CalendarWithMonthSwitcher<T> {...props} {...singleDateSelectionProps} />
  );
}
