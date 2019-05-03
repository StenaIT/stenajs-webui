import { eachDayOfInterval, isAfter, isSameDay } from 'date-fns';
import {
  ComponentEnhancer,
  compose,
  pure,
  withHandlers,
  withProps,
  withState,
} from 'recompose';
import { Omit } from '../../../../../types/Omit';
import { CalendarProps } from '../types/CalendarTypes';
import { CalendarUserData, DayState } from '../types/CalendarTypes';
import { WithCalendarTheme } from '../types/WithCalendarTheme';
import { DayData } from '../util/CalendarDataFactory';
import { ensureStartIsFirst } from '../util/CalendarIntervalValidator';
import { addDayStateHighlights } from '../util/StateModifier';
import { WithMonthSwitcherProps } from './month-switcher/MonthSwitcher';
import { MonthSwitcherLogicOuterProps } from './month-switcher/MonthSwitcherLogic';

export type __C359813518 = ComponentEnhancer<{}, {}>;

export type DateRangeFocusedInput = 'startDate' | 'endDate' | undefined;

export type DateRangeCalendarProps<T> = Omit<CalendarProps<T>, 'theme'> &
  MonthSwitcherLogicOuterProps &
  DateRangeCalendarState &
  OnChangePropsDateRangeSelection &
  WithCalendarTheme &
  WithMonthSwitcherProps;

export type DateRangeCalendarPropsWithStateProps<T> = Omit<
  CalendarProps<T>,
  'theme'
> &
  OnChangePropsDateRangeSelection &
  WithCalendarTheme &
  WithMonthSwitcherProps;

export interface DateRangeCalendarState {
  startDate: Date | undefined;
  endDate: Date | undefined;
  focusedInput?: DateRangeFocusedInput;
  setStartDate: (startDate: Date) => void;
  setEndDate: (endDate: Date) => void;
  setFocusedInput: (focusedInput: DateRangeFocusedInput) => void;
}

export interface DateRangeCalendarOnChangeValue {
  startDate?: Date;
  endDate?: Date;
}

export interface OnChangePropsDateRangeSelection {
  /** onChange handler for when the user selects a date. */
  onChange?: (value: DateRangeCalendarOnChangeValue) => void;
}

type InnerProps<T> = CalendarProps<T> &
  DateRangeCalendarState &
  OnChangePropsDateRangeSelection;

interface OnClickHandlers {
  onClickDay: (day: DayData) => void;
}

const withOnClickDayHandler = withHandlers<InnerProps<{}>, OnClickHandlers>({
  onClickDay: ({
    focusedInput,
    endDate,
    startDate,
    setStartDate,
    setEndDate,
    onChange,
    setFocusedInput,
  }) => (day: DayData) => {
    if (focusedInput === 'startDate') {
      if (endDate && isAfter(day.date, endDate)) {
        setStartDate(endDate);
        setEndDate(day.date);
        if (onChange) {
          onChange({ startDate: endDate, endDate: day.date });
        }
      } else {
        setStartDate(day.date);
        setFocusedInput('endDate');
        if (onChange) {
          onChange(
            ensureStartIsFirst({
              startDate: day.date,
              endDate: endDate,
            }),
          );
        }
      }
    } else if (focusedInput === 'endDate') {
      if (startDate && isAfter(startDate, day.date)) {
        setStartDate(day.date);
        setEndDate(startDate);
        if (onChange) {
          onChange({ startDate: day.date, endDate: startDate });
        }
      } else {
        setEndDate(day.date);
        setFocusedInput('startDate');
        if (onChange) {
          onChange(
            ensureStartIsFirst({
              startDate: startDate,
              endDate: day.date,
            }),
          );
        }
      }
    }
  },
});

const toggleDatesIfEndIsEarlierThanStart = withProps(
  ({ startDate, endDate }: InnerProps<{}>) => {
    if (startDate && endDate && isAfter(startDate, endDate)) {
      return {
        startDate: endDate,
        endDate: startDate,
      };
    }
    return {};
  },
);

interface WithStatePerMonth {
  statePerMonth?: CalendarUserData<DayState>;
}

const withStatePerMonth = withProps<WithStatePerMonth, InnerProps<{}>>(
  ({ startDate, endDate, statePerMonth }) => ({
    statePerMonth: buildDayState(statePerMonth, startDate, endDate),
  }),
);

export const buildDayState = (
  statePerMonth: CalendarUserData<DayState> = {},
  start?: Date,
  end?: Date,
): CalendarUserData<DayState> | undefined => {
  if (start && end) {
    return eachDayOfInterval({ start, end }).reduce(
      (result: CalendarUserData<DayState>, date: Date) => {
        const isFirstInRange = isSameDay(date, start);
        const isLastInRange = isSameDay(date, end);
        return addDayStateHighlights(
          result,
          date,
          isFirstInRange || isLastInRange ? ['selected', 'range'] : ['range'],
        );
      },
      statePerMonth,
    );
  }
  if (start) {
    return addDayStateHighlights(statePerMonth, start, ['selected']);
  }
  if (end) {
    return addDayStateHighlights(statePerMonth, end, ['selected']);
  }
  return statePerMonth;
};

export const withDateRangeSelectionState = compose(
  withState('startDate', 'setStartDate', undefined),
  withState('endDate', 'setEndDate', undefined),
  withState('focusedInput', 'setFocusedInput', 'startDate'),
);

export const withDateRangeSelection = compose(
  withOnClickDayHandler,
  toggleDatesIfEndIsEarlierThanStart,
  pure,
  withStatePerMonth,
);
