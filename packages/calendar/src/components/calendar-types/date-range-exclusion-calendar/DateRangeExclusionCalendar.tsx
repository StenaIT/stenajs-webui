import * as React from "react";
import { CalendarWithMonthSwitcher } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { useDateRangeExclusionSelection } from "./UseDateRangeExclusionSelection";
import { UseInternalPanelStateArgs } from "../../../features/internal-panel-state/UseInternalPanelState";
import { CalendarWithInternalPanelAndFocusStateProps } from "../../../types/CalendarWithInternalPanelAndFocusStateProps";

export interface DateRangeExclusionCalendarProps<T>
  extends CalendarWithInternalPanelAndFocusStateProps<T>,
    UseInternalPanelStateArgs {
  value?: Array<Date>;
  onChange?: (value: Array<Date>) => void;
}

export function DateRangeExclusionCalendar<T extends {}>(
  props: DateRangeExclusionCalendarProps<T>
) {
  const selectionProps = useDateRangeExclusionSelection(props);
  return <CalendarWithMonthSwitcher<T> {...props} {...selectionProps} />;
}
