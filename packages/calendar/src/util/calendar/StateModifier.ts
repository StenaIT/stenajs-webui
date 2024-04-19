import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDate,
  getISOWeek,
  isAfter,
  isSameDay,
  max,
  min,
  startOfMonth,
  subDays,
} from "date-fns";
import { last } from "lodash-es";
import {
  CalendarState,
  CalendarUserData,
  DayState,
  DayStateHighlight,
  StateForWeek,
} from "../../types/CalendarTypes";
import { DateFormats } from "../date/DateFormats";
import { WeekData } from "./CalendarDataFactory";

export const buildDayStateForDateRange = (
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
    return buildDayStateForDateRange(
      statePerMonth,
      max([start, subDays(startLimit, 1)]),
      min([end, addDays(endLimit, 1)])
    );
  } else {
    return buildDayStateForDateRange(statePerMonth, start, end);
  }
};

export const setDayStateValue = (
  state: CalendarUserData<DayState> | undefined,
  date: Date,
  values: Partial<DayState>
): CalendarUserData<DayState> => {
  const monthString = format(date, DateFormats.yearAndMonth);
  const weekNumber = getISOWeek(date);
  const dayInMonth = getDate(date);
  return {
    ...state,
    [monthString]: {
      ...(state && state[monthString]),
      [weekNumber]: {
        ...(state && state[monthString] && state[monthString][weekNumber]),
        [dayInMonth]: {
          ...(state &&
            state[monthString] &&
            state[monthString][weekNumber] &&
            state[monthString][weekNumber][dayInMonth]),
          ...values,
        },
      },
    },
  };
};

export const setDayStateValueFunction = (
  state: CalendarUserData<DayState> | undefined,
  date: Date,
  setter: (dayState: DayState | undefined) => Partial<DayState>
): CalendarUserData<DayState> => {
  const monthString = format(date, DateFormats.yearAndMonth);
  const weekNumber = getISOWeek(date);
  const dayInMonth = getDate(date);
  return {
    ...state,
    [monthString]: {
      ...(state && state[monthString]),
      [weekNumber]: {
        ...(state && state[monthString] && state[monthString][weekNumber]),
        [dayInMonth]: {
          ...(state &&
            state[monthString] &&
            state[monthString][weekNumber] &&
            state[monthString][weekNumber][dayInMonth]),
          ...setter(
            state &&
              state[monthString] &&
              state[monthString][weekNumber] &&
              state[monthString][weekNumber][dayInMonth]
          ),
        },
      },
    },
  };
};

export const addDayStateHighlights = (
  calendarState: CalendarState | undefined,
  date: Date,
  highlights: Array<DayStateHighlight>
): CalendarUserData<DayState> => {
  const month = date.getMonth() + 1;
  const monthString = `${date.getFullYear()}-${month < 10 ? "0" : ""}${month}`;
  const weekNumber = getISOWeek(date);
  const dayInMonth = getDate(date);
  const dayState: DayState | undefined =
    calendarState &&
    calendarState[monthString] &&
    calendarState[monthString][weekNumber] &&
    calendarState[monthString][weekNumber][dayInMonth];

  return {
    ...calendarState,
    [monthString]: {
      ...(calendarState && calendarState[monthString]),
      [weekNumber]: {
        ...(calendarState &&
          calendarState[monthString] &&
          calendarState[monthString][weekNumber]),
        [dayInMonth]: addDayStateHighlightsOnSingleDay(dayState, highlights),
      },
    },
  };
};

export const addDayStateHighlightsOnSingleDay = (
  dayState: DayState | undefined,
  highlights: Array<DayStateHighlight>
): DayState => {
  return {
    ...dayState,
    highlights: [...(dayState?.highlights ?? []), ...highlights],
  };
};

export const addWeekStateHighlights = (
  calendarState: CalendarState | undefined,
  week: WeekData,
  highlights: Array<DayStateHighlight>
): CalendarUserData<DayState> => {
  const date = week.days[0].date;
  const month = date.getMonth() + 1;
  const monthString = `${date.getFullYear()}-${month < 10 ? "0" : ""}${month}`;
  const weekNumber = week.weekNumber;

  let state = calendarState;
  week.days.forEach((day) => {
    state = addDayStateHighlights(state, day.date, highlights);
  });

  const weekState =
    state && state[monthString] ? state[monthString][weekNumber] : undefined;

  const newHighlights: Array<DayStateHighlight> =
    weekState && weekState.highlights
      ? [...weekState.highlights, ...highlights]
      : highlights;

  const newWeekState: StateForWeek = {
    ...weekState,
    highlights: newHighlights,
  };

  return {
    ...state,
    [monthString]: {
      ...(calendarState && calendarState[monthString]),
      [weekNumber]: newWeekState,
    },
  };
};

export const addWeekRangeHighlights = (
  calendarState: CalendarState | undefined,
  week: WeekData
): CalendarUserData<DayState> => {
  if (!week.days.length) {
    return { ...calendarState };
  }
  const startDate = week.days[0].date;
  const endDate = last(week.days)?.date;
  return {
    ...buildDayStateForDateRange(calendarState, startDate, endDate),
  };
};
