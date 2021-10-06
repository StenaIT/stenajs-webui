import * as React from "react";
import { CalendarWithMonthSwitcher } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { useDateRangeExclusionSelection } from "./UseDateRangeExclusionSelection";
import { UseInternalPanelStateProps } from "../../../features/internal-panel-state/UseInternalPanelState";
import { InternalPanelAndFocusStateProps } from "../../../types/InternalPanelAndFocusStateProps";

export interface DateRangeExclusionCalendarProps<T>
  extends InternalPanelAndFocusStateProps<T>,
    UseInternalPanelStateProps {
  value?: Array<Date>;
  onChange?: (value: Array<Date>) => void;
}

export function DateRangeExclusionCalendar<T extends {}>(
  props: DateRangeExclusionCalendarProps<T>
) {
  const selectionProps = useDateRangeExclusionSelection(props);
  return <CalendarWithMonthSwitcher<T> {...props} {...selectionProps} />;
}
