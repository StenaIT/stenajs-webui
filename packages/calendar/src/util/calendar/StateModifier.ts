import { format, getDate, getISOWeek } from "date-fns";
import {
  CalendarState,
  CalendarUserData,
  DayState,
  DayStateHighlight,
  StateForWeek,
} from "../../types/CalendarTypes";
import { DateFormats } from "../date/DateFormats";
import { WeekData } from "./CalendarDataFactory";

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

  const newHighlights: Array<DayStateHighlight> =
    dayState && dayState.highlights
      ? [...dayState.highlights, ...highlights]
      : highlights;

  return {
    ...calendarState,
    [monthString]: {
      ...(calendarState && calendarState[monthString]),
      [weekNumber]: {
        ...(calendarState &&
          calendarState[monthString] &&
          calendarState[monthString][weekNumber]),
        [dayInMonth]: {
          ...dayState,
          highlights: newHighlights,
        },
      },
    },
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
