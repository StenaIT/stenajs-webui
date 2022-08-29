import * as React from "react";
import { CalendarWithMonthSwitcher } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { useDateRangeExclusionSelection } from "./UseDateRangeExclusionSelection";
import { UseInternalPanelStateProps } from "../../../features/internal-panel-state/UseInternalPanelState";
import { InternalPanelAndFocusStateProps } from "../../../types/InternalPanelAndFocusStateProps";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";

export interface DateRangeExclusionCalendarProps<T>
  extends InternalPanelAndFocusStateProps<T>,
    UseInternalPanelStateProps,
    ValueAndOnValueChangeProps<Array<Date>> {}

export function DateRangeExclusionCalendar<T>(
  props: DateRangeExclusionCalendarProps<T>
) {
  const selectionProps = useDateRangeExclusionSelection(props);
  return <CalendarWithMonthSwitcher<T> {...props} {...selectionProps} />;
}
