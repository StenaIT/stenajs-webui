import { CalendarWithMonthSwitcherProps } from "../features/month-switcher/CalendarWithMonthSwitcher";
import { UseInternalPanelStateArgs } from "../features/internal-panel-state/UseInternalPanelState";

export type CalendarWithInternalPanelAndFocusStateProps<T> = Omit<
  CalendarWithMonthSwitcherProps<T>,
  "currentPanel" | "setCurrentPanel" | "dateInFocus" | "setDateInFocus"
> &
  UseInternalPanelStateArgs;
