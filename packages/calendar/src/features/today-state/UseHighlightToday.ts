import { useMemo } from "react";
import { CalendarState } from "../../types/CalendarTypes";
import { addDayStateHighlights } from "../../util/calendar/StateModifier";

export const useHighlightToday = (
  enabled: boolean | undefined,
  statePerMonth: CalendarState | undefined,
) => {
  return useMemo(() => {
    return enabled
      ? addDayStateHighlights(statePerMonth, new Date(), ["today"])
      : statePerMonth;
  }, [enabled, statePerMonth]);
};
