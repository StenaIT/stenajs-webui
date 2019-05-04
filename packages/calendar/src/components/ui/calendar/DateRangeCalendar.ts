import { ComponentClass } from "react";
import { compose, setDisplayName } from "recompose";
import { createCalendar } from "./components/Calendar";
import {
  DateRangeCalendarProps,
  DateRangeCalendarPropsWithStateProps,
  withDateRangeSelection,
  withDateRangeSelectionState
} from "./features/DateRangeSelection";
import { withMonthSwitcher } from "./features/month-switcher/MonthSwitcher";
import { withTodayInDayState } from "./features/today-state/WithTodayInDayState";
import { CalendarProps } from "./types/CalendarTypes";

export type __C1241241 = ComponentClass<{}>;

export const createDateRangeCalendar = <T extends {}>() =>
  setDisplayName("DateRangeCalendar")(
    compose<CalendarProps<T>, DateRangeCalendarProps<T>>(
      withDateRangeSelection,
      withMonthSwitcher,
      withTodayInDayState<T>()
    )(createCalendar<T>())
  );

export const createDateRangeCalendarWithState = <T extends {}>() =>
  setDisplayName("DateRangeCalendarWithState")(
    compose<CalendarProps<T>, DateRangeCalendarPropsWithStateProps<T>>(
      withDateRangeSelectionState,
      withDateRangeSelection,
      withMonthSwitcher,
      withTodayInDayState<T>()
    )(createCalendar<T>())
  );

export const DateRangeCalendar = createDateRangeCalendar();
export const DateRangeCalendarWithState = createDateRangeCalendarWithState();
