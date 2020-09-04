import { eachDayOfInterval, isAfter, isSameDay } from "date-fns";
import { CalendarUserData, DayState } from "../../../../types/CalendarTypes";
import { addDayStateHighlights } from "../../../../util/calendar/StateModifier";

export const buildDayState = (
  statePerMonth: CalendarUserData<DayState> = {},
  start?: Date,
  end?: Date
): CalendarUserData<DayState> | undefined => {
  if (start && end && isAfter(end, start)) {
    return eachDayOfInterval({ start, end }).reduce(
      (result: CalendarUserData<DayState>, date: Date) => {
        const isFirstInRange = isSameDay(date, start);
        const isLastInRange = isSameDay(date, end);
        const highlights = isFirstInRange
          ? ["selected", "selectedStart", "range"]
          : isLastInRange
          ? ["selected", "selectedEnd", "range"]
          : ["range"];
        return addDayStateHighlights(result, date, highlights);
      },
      statePerMonth
    );
  }

  let state = statePerMonth;

  if (start) {
    state = addDayStateHighlights(state, start, ["selected"]);
  }

  if (end) {
    state = addDayStateHighlights(state, end, ["selected"]);
  }

  return state;
};
