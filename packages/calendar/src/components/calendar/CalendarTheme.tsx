import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { TextProps } from "@stenajs-webui/core";
import { CSSProperties } from "react";
import { DayState, DayStateHighlight } from "../../types/CalendarTypes";

import {
  DayData,
  MonthData,
  WeekData,
} from "../../util/calendar/CalendarDataFactory";
import { dayHighlightSelect } from "../../util/calendar/StateHelper";

export interface CalendarTheme<TUserData = unknown> {
  width: string;
  height: string;
  WeekNumber: WeekNumberTheme;
  WeekDay: WeekDayTheme;
  CalendarDay: CalendarDayTheme<TUserData>;
  CalendarMonth: CalendarMonthTheme;
}

export interface WeekNumberTheme {
  backgroundColor: string;
  textColor?: string;
  clickableTextColor?: string;
}

export interface CalendarMonthTheme {
  headerTextColor?: string;
  cellSpacing?: string;
  headerLeftIcon?: IconDefinition;
  headerRightIcon?: IconDefinition;
}

export interface WeekDayTheme {
  textColor?: string;
  clickableTextColor?: string;
}

export type CalendarStyleProvider<TUserData, TResult> = (
  defaultHighlights: Array<DayStateHighlight> | undefined,
  dayState: DayState | undefined,
  day: DayData,
  week: WeekData,
  month: MonthData,
  userData?: TUserData,
) => TResult;

export type CalendarWrapperStyleProvider<TUserData> = CalendarStyleProvider<
  TUserData,
  CSSProperties | undefined
>;

type TextPropsProvider<TUserData> = CalendarStyleProvider<
  TUserData,
  TextProps | undefined
>;

export interface CalendarDayTheme<TUserData> {
  tdStyle?: CalendarWrapperStyleProvider<TUserData>;
  innerWrapperStyle?: CalendarWrapperStyleProvider<TUserData>;
  cellWrapperStyle?: CalendarWrapperStyleProvider<TUserData>;
  textProps?: TextPropsProvider<TUserData>;
}

export interface CalendarDefaultWrapperColors {
  selectedBackground: string;
  rangeBackground: string;
  todayBackground: string;
  borderColor?: string;
  borderRadius?: string;
  rangeBorderRadius?: string;
}

export const defaultWrapperStyleProvider =
  ({
    selectedBackground,
    todayBackground,
    rangeBackground,
    borderColor = "transparent",
  }: CalendarDefaultWrapperColors): CalendarWrapperStyleProvider<unknown> =>
  (defaultHighlights, dayState, day, _, month) => {
    const backgroundColor = dayHighlightSelect(
      dayState,
      defaultHighlights,
      ["selected", "range", "today", day.month === month.monthInYear],
      [selectedBackground, rangeBackground, todayBackground, "#fff"],
      "transparent",
    );

    return {
      backgroundColor,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: dayHighlightSelect(
        dayState,
        defaultHighlights,
        ["selectedStart", "selectedEnd", "singleSelected", "range", "today"],
        [
          "var(--swui-calendar-wrapper-range-background)",
          "var(--swui-calendar-wrapper-range-background)",
          "var(--swui-calendar-wrapper-range-background)",
          "var(--swui-calendar-wrapper-range-border)",
          "var(--lhds-color-ui-500)",
        ],
        borderColor,
      ),
      borderTopLeftRadius: dayHighlightSelect(
        dayState,
        defaultHighlights,
        ["selectedStart", "singleSelected", "today"],
        [
          "var(--swui-calendar-day-border-radius)",
          "var(--swui-calendar-day-border-radius)",
          "var(--swui-calendar-day-border-radius)",
        ],
        "unset",
      ),
      borderBottomLeftRadius: dayHighlightSelect(
        dayState,
        defaultHighlights,
        ["selectedStart", "singleSelected", "today"],
        [
          "var(--swui-calendar-day-border-radius)",
          "var(--swui-calendar-day-border-radius)",
          "var(--swui-calendar-day-border-radius)",
        ],
        "unset",
      ),
      borderTopRightRadius: dayHighlightSelect(
        dayState,
        defaultHighlights,
        ["selectedEnd", "singleSelected", "today"],
        [
          "var(--swui-calendar-day-border-radius)",
          "var(--swui-calendar-day-border-radius)",
          "var(--swui-calendar-day-border-radius)",
        ],
        "unset",
      ),
      borderBottomRightRadius: dayHighlightSelect(
        dayState,
        defaultHighlights,
        ["selectedEnd", "singleSelected", "today"],
        [
          "var(--swui-calendar-day-border-radius)",
          "var(--swui-calendar-day-border-radius)",
          "var(--swui-calendar-day-border-radius)",
        ],
        "unset",
      ),
      boxSizing: "border-box",
    };
  };

interface DefaultTextColors {
  disabledColor: string;
  inOtherMonthColor: string;
  selectedColor: string;
  rangeTextColor?: string;
}

export const defaultTextPropsProvider = ({
  selectedColor,
  disabledColor,
  inOtherMonthColor,
  rangeTextColor,
}: DefaultTextColors): TextPropsProvider<unknown> => {
  return (defaultHighlights, dayState, day, _, month) => {
    const isOtherMonth = day.month !== month.monthInYear;
    const color = dayHighlightSelect(
      dayState,
      defaultHighlights,
      [isOtherMonth, "selected", "range", "enabled", "disabled"],
      [
        inOtherMonthColor,
        selectedColor,
        rangeTextColor,
        undefined,
        disabledColor,
      ],
    );
    return {
      color,
    };
  };
};

export const defaultCalendarTheme: CalendarTheme = {
  width: "var(--swui-calendar-day-width)",
  height: "var(--swui-calendar-day-height)",
  WeekNumber: {
    backgroundColor: "var(--swui-calendar-week-number-bg-color)",
    textColor: "var(--swui-calendar-week-number-text-color)",
    clickableTextColor: "var(--swui-calendar-week-number-clickable-text-color)",
  },
  WeekDay: {
    textColor: "var(--swui-calendar-week-day-text-color)",
    clickableTextColor: "var(--swui-calendar-week-day-clickable-text-color)",
  },
  CalendarDay: {
    tdStyle: defaultWrapperStyleProvider({
      selectedBackground: "var(--swui-calendar-wrapper-selected-background)",
      rangeBackground: "var(--swui-calendar-wrapper-range-background)",
      todayBackground: "var(--swui-calendar-wrapper-today-background)",
    }),
    textProps: defaultTextPropsProvider({
      selectedColor: "var(--swui-calendar-text-selected-color)",
      disabledColor: "var(--swui-calendar-text-disabled-color)",
      inOtherMonthColor: "var(--swui-calendar-text-in-other-month-color)",
    }),
  },
  CalendarMonth: {
    headerTextColor: "var(--swui-calendar-week-day-text-color)",
  },
};

export const extranetCalendarTheme: CalendarTheme = {
  ...defaultCalendarTheme,
  width: "37px",
  height: "37px",
};
