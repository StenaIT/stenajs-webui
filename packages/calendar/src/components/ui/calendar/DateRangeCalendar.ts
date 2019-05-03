import { ComponentClass } from 'react';
import { compose, setDisplayName } from 'recompose';
import { withComponentTheme } from '../../../util/enhancers/WithComponentTheme';
import { createCalendar } from './components/Calendar';
import {
  DateRangeCalendarProps,
  DateRangeCalendarPropsWithStateProps,
  withDateRangeSelection,
  withDateRangeSelectionState,
} from './features/DateRangeSelection';
import { withMonthSwitcher } from './features/month-switcher/MonthSwitcher';
import { withTodayInDayState } from './features/today-state/WithTodayInDayState';
import { CalendarProps } from './types/CalendarTypes';

export type __C1241241 = ComponentClass<{}>;

export const createDateRangeCalendar = <T extends {}>() =>
  setDisplayName<DateRangeCalendarProps<T>>('DateRangeCalendar')(
    compose<CalendarProps<T>, DateRangeCalendarProps<T>>(
      withComponentTheme('Calendar'),
      withDateRangeSelection,
      withMonthSwitcher,
      withTodayInDayState<T>(),
    )(createCalendar<T>()),
  );

export const createDateRangeCalendarWithState = <T extends {}>() =>
  setDisplayName<DateRangeCalendarPropsWithStateProps<T>>(
    'DateRangeCalendarWithState',
  )(
    compose<CalendarProps<T>, DateRangeCalendarPropsWithStateProps<T>>(
      withComponentTheme('Calendar'),
      withDateRangeSelectionState,
      withDateRangeSelection,
      withMonthSwitcher,
      withTodayInDayState<T>(),
    )(createCalendar<T>()),
  );

export const DateRangeCalendar = createDateRangeCalendar();
export const DateRangeCalendarWithState = createDateRangeCalendarWithState();
