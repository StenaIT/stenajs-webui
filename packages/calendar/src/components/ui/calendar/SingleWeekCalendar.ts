import { ComponentClass } from 'react';
import { compose, setDisplayName } from 'recompose';
import { withComponentTheme } from '../../../util/enhancers/WithComponentTheme';
import { createCalendar } from './components/Calendar';
import { withMonthSwitcher } from './features/month-switcher/MonthSwitcher';
import {
  SingleWeekCalendarProps,
  withSingleWeekSelection,
} from './features/SingleWeekSelection';
import { withTodayInDayState } from './features/today-state/WithTodayInDayState';
import { CalendarProps } from './types/CalendarTypes';

export type __C12318572324131 = ComponentClass<{}>;

export const createSingleWeekCalendar = <T extends {}>() =>
  setDisplayName<SingleWeekCalendarProps<T>>('SingleWeekCalendar')(
    compose<CalendarProps<T>, SingleWeekCalendarProps<T>>(
      withSingleWeekSelection,
      withMonthSwitcher,
      withComponentTheme('Calendar'),
      withTodayInDayState<T>(),
    )(createCalendar<T>()),
  );

export const SingleWeekCalendar = createSingleWeekCalendar();
