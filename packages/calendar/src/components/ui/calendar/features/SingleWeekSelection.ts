import {
  ComponentEnhancer,
  compose,
  pure,
  withHandlers,
  withProps,
} from 'recompose';
import { Omit } from '../../../../../types/Omit';
import { CalendarProps } from '../types/CalendarTypes';
import { WithCalendarTheme } from '../types/WithCalendarTheme';
import {
  DayData,
  getStartDateOfISOWeek,
  getWeekForDate,
  WeekData,
} from '../util/CalendarDataFactory';
import { addWeekStateHighlights } from '../util/StateModifier';
import { WithMonthSwitcherProps } from './month-switcher/MonthSwitcher';
import { MonthSwitcherLogicOuterProps } from './month-switcher/MonthSwitcherLogic';

export type __C35981231312518 = ComponentEnhancer<{}, {}>;

export type SingleWeekValue = string;

export type SingleWeekCalendarProps<T> = Omit<CalendarProps<T>, 'theme'> &
  MonthSwitcherLogicOuterProps &
  OnChangePropsSingleWeekSelection &
  WithCalendarTheme &
  WithMonthSwitcherProps;

export interface OnChangePropsSingleWeekSelection {
  value: SingleWeekValue | undefined;
  onChange: (value: SingleWeekValue | undefined) => void;
}

interface SelectionLogicHandlers {
  onClickDay: (day: DayData) => void;
  onClickWeek: (week: WeekData) => void;
}

const addSelectionLogic = withHandlers<
  SingleWeekCalendarProps<{}>,
  SelectionLogicHandlers
>({
  onClickDay: ({ onChange }) => day => {
    if (onChange) {
      onChange(getWeekStringFromWeekData(getWeekForDate(day.date)));
    }
  },
  onClickWeek: ({ onChange }) => week => {
    if (onChange) {
      onChange(getWeekStringFromWeekData(week));
    }
  },
});

const buildSelectionState = withProps<
  Pick<CalendarProps<{}>, 'statePerMonth'>,
  SingleWeekCalendarProps<{}>
>(({ value, statePerMonth }) => {
  const weekData = getWeekDataFromWeekString(value);
  return {
    statePerMonth: weekData
      ? addWeekStateHighlights(statePerMonth, weekData, ['selected'])
      : statePerMonth,
    date: value,
    startDateInFocus: value,
  };
});

const getWeekStringFromWeekData = (
  week: WeekData | undefined,
): string | undefined => {
  if (!week) {
    return undefined;
  }
  return `${week.endYear}-${week.weekNumber}`;
};

const getWeekDataFromWeekString = (
  week: string | undefined,
): WeekData | undefined => {
  if (!week) {
    return undefined;
  }
  const parts = week.split('-');
  const weekNumber = parseInt(parts[1], 10);
  const year = parseInt(parts[0], 10);
  return getWeekForDate(getStartDateOfISOWeek(weekNumber, year));
};

export const withSingleWeekSelection = compose(
  addSelectionLogic,
  pure,
  buildSelectionState,
);
