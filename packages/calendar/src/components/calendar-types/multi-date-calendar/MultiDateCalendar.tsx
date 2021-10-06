import * as React from "react";
import { CalendarWithMonthSwitcher } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { useMultiDateSelection } from "./UseMultiDateSelection";
import { UseInternalPanelStateArgs } from "../../../features/internal-panel-state/UseInternalPanelState";
import { CalendarWithInternalPanelAndFocusStateProps } from "../../../types/CalendarWithInternalPanelAndFocusStateProps";

export interface MultiDateCalendarProps<T>
  extends CalendarWithInternalPanelAndFocusStateProps<T>,
    UseInternalPanelStateArgs {
  value?: Array<Date>;
  onChange?: (value: Array<Date>) => void;
}

export function MultiDateCalendar<T extends {}>(
  props: MultiDateCalendarProps<T>
) {
  const selectionProps = useMultiDateSelection(props);
  return <CalendarWithMonthSwitcher<T> {...props} {...selectionProps} />;
}
