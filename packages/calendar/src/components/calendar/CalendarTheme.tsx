import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { TextProps, Theme, ThemeColorField } from "@stenajs-webui/core";
import { CSSProperties } from "react";
import { DayState, DayStateHighlight } from "../../types/CalendarTypes";

import {
  DayData,
  MonthData,
  WeekData,
} from "../../util/calendar/CalendarDataFactory";
import {
  dayHasHighlight,
  dayHighlightSelect,
} from "../../util/calendar/StateHelper";

export interface CalendarTheme<TUserData = {}> {
  width: string;
  height: string;
  WeekNumber: WeekNumberTheme;
  WeekDay: WeekDayTheme;
  CalendarDay: CalendarDayTheme<TUserData>;
  CalendarMonth: CalendarMonthTheme;
}

export interface WeekNumberTheme {
  backgroundColor: ThemeColorField | string;
  textColor?: ThemeColorField | string;
  show?: boolean;
}

export interface CalendarMonthTheme {
  headerTextColor?: ThemeColorField | string;
  cellSpacing?: string;
  headerLeftIcon?: IconDefinition;
  headerRightIcon?: IconDefinition;
}

export interface WeekDayTheme {
  textColor?: ThemeColorField | string;
}

export type CalendarStyleProvider<TUserData, TResult> = (
  defaultHighlights: Array<DayStateHighlight> | undefined,
  dayState: DayState | undefined,
  day: DayData,
  week: WeekData,
  month: MonthData,
  userData?: TUserData
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
  wrapperStyle?: CalendarWrapperStyleProvider<TUserData>;
  innerWrapperStyle?: CalendarWrapperStyleProvider<TUserData>;
  cellWrapperStyle?: CalendarWrapperStyleProvider<TUserData>;
  textProps?: TextPropsProvider<TUserData>;
}

export interface CalendarDefaultWrapperColors {
  selectedBorder: string;
  selectedBackground: string;
  rangeBorder: string;
  rangeBackground: string;
  todayBorder: string;
  todayBackground: string;
  borderColor?: string;
  borderRadius?: string;
  rangeBorderRadius?: string;
}

export const defaultWrapperStyleProvider = ({
  selectedBackground,
  todayBackground,
  rangeBackground,
  selectedBorder,
  rangeBorder,
  todayBorder,
  borderColor = "transparent",
}: CalendarDefaultWrapperColors): CalendarWrapperStyleProvider<{}> => (
  defaultHighlights,
  dayState,
  day,
  _,
  month
) => {
  let style = {};

  const backgroundColor = dayHighlightSelect(
    dayState,
    defaultHighlights,
    ["selected", "range", "today", day.month === month.monthInYear],
    [selectedBackground, rangeBackground, todayBackground, "#fff"],
    "transparent"
  );

  if (day.month === month.monthInYear) {
    return {
      ...style,
      backgroundColor,
      borderWidth: "1px",
      borderColor: dayHighlightSelect(
        dayState,
        defaultHighlights,
        ["selected", "range", "today"],
        [selectedBorder, rangeBorder, todayBorder],
        borderColor
      ),
      borderCollapse: "collapse",
      borderStyle:
        dayHasHighlight(dayState, defaultHighlights, "selected") ||
        dayHasHighlight(dayState, defaultHighlights, "range") ||
        dayHasHighlight(dayState, defaultHighlights, "today")
          ? "double"
          : "solid",
      boxSizing: "border-box",
    };
  }
  return style;
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
}: DefaultTextColors): TextPropsProvider<{}> => {
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
      ]
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
    show: true,
  },
  WeekDay: {
    textColor: "var(--swui-calendar-week-day-text-color)",
  },
  CalendarDay: {
    wrapperStyle: defaultWrapperStyleProvider({
      selectedBorder: "var(--swui-calendar-wrapper-selected-border)",
      selectedBackground: "var(--swui-calendar-wrapper-selected-background)",
      rangeBorder: "var(--swui-calendar-wrapper-range-border)",
      rangeBackground: "var(--swui-calendar-wrapper-range-background)",
      todayBorder: "var(--swui-calendar-wrapper-today-border)",
      todayBackground: "var(--swui-calendar-wrapper-today-background)",
    }),
    textProps: defaultTextPropsProvider({
      selectedColor: "var(--swui-calendar-text-selected-color)",
      disabledColor: "var(--swui-calendar-text-disabled-color)",
      inOtherMonthColor: "var(--swui-calendar-text-in-other-month-color)",
    }),
  },
  CalendarMonth: {},
};

export const extranetCalendarTheme: CalendarTheme = {
  ...defaultCalendarTheme,
  width: "37px",
  height: "37px",
};

export const resolveThemeColor = (s: string, theme: Theme): string =>
  theme.colors[s] || s;
