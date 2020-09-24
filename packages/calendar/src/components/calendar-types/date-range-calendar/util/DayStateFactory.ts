import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  isAfter,
  isSameDay,
  max,
  min,
  startOfMonth,
  subDays,
} from "date-fns";
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
    state = addDayStateHighlights(state, start, ["selected", "singleSelected"]);
  }

  if (end) {
    state = addDayStateHighlights(state, end, ["selected", "singleSelected"]);
  }

  return state;
};

export const buildDayStateForSingleMonth = (
  statePerMonth: CalendarUserData<DayState> = {},
  start: Date | undefined,
  end: Date | undefined,
  dateInFocus: Date
): CalendarUserData<DayState> | undefined =>
  buildDayStateForRange(
    statePerMonth,
    start,
    end,
    startOfMonth(dateInFocus),
    endOfMonth(dateInFocus)
  );

export const buildDayStateForRange = (
  statePerMonth: CalendarUserData<DayState> = {},
  start: Date | undefined,
  end: Date | undefined,
  startLimit: Date,
  endLimit: Date
): CalendarUserData<DayState> | undefined => {
  if (start && end) {
    return buildDayState(
      statePerMonth,
      max([start, subDays(startLimit, 1)]),
      min([end, addDays(endLimit, 1)])
    );
  } else {
    return buildDayState(statePerMonth, start, end);
  }
};
