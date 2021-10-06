import { UseInternalPanelStateProps } from "../features/internal-panel-state/UseInternalPanelState";
import { CalendarWithMonthSwitcherProps } from "../features/month-switcher/CalendarWithMonthSwitcher";

export type InternalPanelAndFocusStateProps<T> = Omit<
  CalendarWithMonthSwitcherProps<T>,
  "currentPanel" | "setCurrentPanel" | "dateInFocus" | "setDateInFocus"
> &
  UseInternalPanelStateProps;
