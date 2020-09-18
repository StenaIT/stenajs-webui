import * as React from "react";
import { CalendarTheme } from "../components/calendar/CalendarTheme";
import {
  DayData,
  MonthData,
  WeekData,
} from "../util/calendar/CalendarDataFactory";

export interface CalendarDayProps<T = {}> extends ExtraDayContentProps<T> {
  extraDayContent?: React.ComponentType<ExtraDayContentProps<T>>;
  onClickDay?: OnClickDay<T>;
  defaultHighlights?: Array<DayStateHighlight>;
}

export interface ExtraDayContentProps<T = {}> {
  month: MonthData;
  week: WeekData;
  day: DayData;
  dayState?: DayState;
  userData?: T;
  theme: CalendarTheme;
}

export interface CalendarOnClicks<T> {
  /** onClick for the week day names over the days in the month. */
  onClickWeekDay?: OnClickWeekDay;
  /** onClick for the week numbers to the left of the days in the month. */
  onClickWeek?: OnClickWeek;
  /** onClick for a day in the calendar */
  onClickDay?: OnClickDay<T>;
  /** onClick for the month in the calendar header */
  onClickMonth?: OnClickMonth;
  /** onClick for the year in the calendar header */
  onClickYear?: OnClickYear;
}

export type RenderWeekNumber = (
  week: WeekData,
  theme: CalendarTheme,
  onClick?: OnClickWeek
) => JSX.Element;
export type RenderWeekDay = (
  weekDayName: string,
  theme: CalendarTheme,
  onClick?: OnClickWeekDay
) => JSX.Element;

export interface Renderers {
  /** Render function for week number to the left of the days in the month. */
  renderWeekNumber?: RenderWeekNumber;
  /** Render function for week day names over the days in the month. */
  renderWeekDay?: RenderWeekDay;
}

export interface CalendarProps<T>
  extends CalendarHeaderContentProps,
    CalendarOnClicks<T>,
    Renderers {
  /** The year to show. If used, must also provide month. Overrides prop date. */
  year?: number;
  /** The month to show. If used, must also provide year. Overrides prop date. */
  month?: number;
  /** The date to show. If used, do not use props year and month. */
  date?: Date;
  /** Number of months to display. The selected date will be the first month. */
  numMonths?: number;
  /** Split the months into rows. */
  monthsPerRow?: number;
  /** User value to pass down to renderers. */
  userDataPerMonth?: CalendarUserData<T>;
  /** Internal state to pass down to renderers. Do not use it, this is used by the framework. */
  statePerMonth?: CalendarState;
  /**
   * The component to use to render a day in the calendar.
   * Must use CalendarDayProps. Use CalendarDay or create your own.
   */
  dayComponent?: React.ComponentType<CalendarDayProps<T>>;
  /**
   * If supplied, this component will be rendered in the default day component inside a relative div.
   * This allows for added custom content in a day cell.
   */
  extraDayContent?: React.ComponentType<ExtraDayContentProps<T>>;
  /** The width of a cell in the calendar. Applies to days, week numbers, headers, etc. */
  width?: string;
  /** The height of a cell in the calendar. Applies to days, week numbers, headers, etc. */
  height?: string;

  /** Default highlights that will be applied to all days. */
  defaultHighlights?: Array<DayStateHighlight>;

  /** If true, today's date will be highlighted. */
  highlightToday?: boolean;

  /** The theme to use. */
  theme?: CalendarTheme;
}

export interface CalendarHeaderContentProps {
  /** Content to put left of the month header text. */
  headerLeftContent?: React.ReactElement<{}>;
  /** Content to put right of the month header text. */
  headerRightContent?: React.ReactElement<{}>;
}

export interface CalendarPropsWithDateSet<T> {
  year: number;
  month: number;
  numMonths?: number;
  monthsPerRow?: number;
  dayComponent?: React.ComponentType<CalendarDayProps<T>>;
}

export type DayStateHighlight =
  | "selected"
  | "selectedStart"
  | "selectedEnd"
  | "range"
  | "today"
  | "error"
  | "disabled"
  | string;

export interface HighlightsState {
  highlights?: Array<DayStateHighlight>;
}

export type DayState = HighlightsState;
export type OnClickDay<T> = (
  day: DayData,
  data: T | undefined,
  ev: React.MouseEvent<HTMLButtonElement>
) => void;
export type OnClickWeekDay = (
  weekDay: number,
  ev: React.MouseEvent<HTMLButtonElement>
) => void;
export type OnClickWeek = (
  week: WeekData,
  ev: React.MouseEvent<HTMLButtonElement>
) => void;
export type OnClickMonth = (month: MonthData) => void;
export type OnClickYear = (year: number) => void;
export type CalendarUserData<T> = { [key: string]: CalendarUserMonthData<T> };
export type CalendarUserMonthData<T> = {
  [key: number]: CalendarUserWeekData<T>;
};
export type CalendarUserWeekData<T> = { [key: number]: T };
export type CalendarState = { [key: string]: StateForMonth };
export type StateForMonth = { [key: number]: StateForWeek };
export type StateForWeek = { [key: number]: DayState } & HighlightsState;
