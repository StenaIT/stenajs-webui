import { eachDayOfInterval, isSameDay } from "date-fns";
import { CalendarUserData, DayState } from "../../../../types/CalendarTypes";
import { addDayStateHighlights } from "../../../../util/calendar/StateModifier";

export const buildDayState = (
  statePerMonth: CalendarUserData<DayState> = {},
  start?: Date,
  end?: Date
): CalendarUserData<DayState> | undefined => {
  if (start && end) {
    return eachDayOfInterval({ start, end }).reduce(
      (result: CalendarUserData<DayState>, date: Date) => {
        const isFirstInRange = isSameDay(date, start);
        const isLastInRange = isSameDay(date, end);
        return addDayStateHighlights(
          result,
          date,
          isFirstInRange || isLastInRange ? ["selected", "range"] : ["range"]
        );
      },
      statePerMonth
    );
  }
  if (start) {
    return addDayStateHighlights(statePerMonth, start, ["selected"]);
  }
  if (end) {
    return addDayStateHighlights(statePerMonth, end, ["selected"]);
  }
  return statePerMonth;
};
