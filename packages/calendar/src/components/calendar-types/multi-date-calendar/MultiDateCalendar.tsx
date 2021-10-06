import * as React from "react";
import { CalendarWithMonthSwitcher } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { useMultiDateSelection } from "./UseMultiDateSelection";
import { UseInternalPanelStateProps } from "../../../features/internal-panel-state/UseInternalPanelState";
import { InternalPanelAndFocusStateProps } from "../../../types/InternalPanelAndFocusStateProps";

export interface MultiDateCalendarProps<T>
  extends InternalPanelAndFocusStateProps<T>,
    UseInternalPanelStateProps {
  value?: Array<Date>;
  onChange?: (value: Array<Date>) => void;
}

export function MultiDateCalendar<T extends {}>(
  props: MultiDateCalendarProps<T>
) {
  const selectionProps = useMultiDateSelection(props);
  return <CalendarWithMonthSwitcher<T> {...props} {...selectionProps} />;
}
