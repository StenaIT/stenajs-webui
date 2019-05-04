import { ComponentClass } from "react";
import { compose, setDisplayName } from "recompose";
import { createCalendar } from "./components/Calendar";
import { withMonthSwitcher } from "./features/month-switcher/MonthSwitcher";
import {
  SingleDateCalendarProps,
  withSingleDateSelection
} from "./features/SingleDateSelection";
import { withTodayInDayState } from "./features/today-state/WithTodayInDayState";
import { CalendarProps } from "./types/CalendarTypes";

export type __C124124131 = ComponentClass<{}>;

export const createSingleDateCalendar = <T extends {}>() =>
  setDisplayName("SingleDateCalendar")(
    compose<CalendarProps<T>, SingleDateCalendarProps<T>>(
      withSingleDateSelection,
      withMonthSwitcher,
      withTodayInDayState<T>()
    )(createCalendar<T>())
  );

export const SingleDateCalendar = createSingleDateCalendar();
