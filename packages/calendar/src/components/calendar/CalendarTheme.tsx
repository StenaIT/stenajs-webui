import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { TextProps, Theme, ThemeColorField } from "@stenajs-webui/core";
import { ButtonTheme, defaultButtonTheme } from "@stenajs-webui/elements";
import { CSSProperties } from "react";
import { DayState, DayStateHighlight } from "../../types/CalendarTypes";
import {
  DayData,
  MonthData,
  WeekData
} from "../../util/calendar/CalendarDataFactory";
import {
  dayHasHighlight,
  dayHighlightSelect
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

export interface SwitchButtonTheme extends ButtonTheme {
  height: string;
  width?: string;
}

export interface CalendarMonthTheme {
  headerTextColor?: ThemeColorField | string;
  SwitchButton?: SwitchButtonTheme;
  cellSpacingPx?: number;
  headerLeftIcon?: IconDefinition;
  headerRightIcon?: IconDefinition;
}

export interface WeekDayTheme {
  textColor?: ThemeColorField | string;
}

type CalendarStyleProvider<TUserData, TResult> = (
  theme: Theme,
  defaultHighlights: Array<DayStateHighlight> | undefined,
  dayState: DayState | undefined,
  day: DayData,
  week: WeekData,
  month: MonthData,
  userData?: TUserData
) => TResult;

type WrapperStyleProvider<TUserData> = CalendarStyleProvider<
  TUserData,
  CSSProperties | undefined
>;

type TextPropsProvider<TUserData> = CalendarStyleProvider<
  TUserData,
  TextProps | undefined
>;

export interface CalendarDayTheme<TUserData> {
  wrapperStyle?: WrapperStyleProvider<TUserData>;
  innerWrapperStyle?: WrapperStyleProvider<TUserData>;
  cellWrapperStyle?: WrapperStyleProvider<TUserData>;
  textProps?: TextPropsProvider<TUserData>;
}

interface DefaultWrapperColors {
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

interface DefaultInnerWrapperColors {
  rangeBackground: string;
  verticalExpand: string;
  horizontalExpand: string;
}

export const defaultWrapperStyleProvider = ({
  selectedBackground,
  todayBackground,
  rangeBackground,
  selectedBorder,
  rangeBorder,
  todayBorder,
  borderColor = "separatorLight",
  borderRadius,
  rangeBorderRadius
}: DefaultWrapperColors): WrapperStyleProvider<{}> => (
  theme,
  defaultHighlights,
  dayState,
  day,
  _,
  month
) => {
  let style = {};

  if (borderRadius && borderRadius !== rangeBorderRadius) {
    style = {
      ...style,
      borderRadius: dayHighlightSelect(
        dayState,
        defaultHighlights,
        ["selectedStart", "selectedEnd", "range"],
        [
          `${borderRadius} ${rangeBorderRadius} ${rangeBorderRadius} ${borderRadius}`,
          `${rangeBorderRadius} ${borderRadius} ${borderRadius} ${rangeBorderRadius}`,
          rangeBorderRadius
        ],
        borderRadius
      ),
      position: dayHighlightSelect(
        dayState,
        defaultHighlights,
        ["selectedStart", "selectedEnd"],
        ["relative", "relative"],
        ""
      ),
      left: dayHighlightSelect(
        dayState,
        defaultHighlights,
        ["selectedStart", "selectedEnd"],
        ["1px", "-1px"],
        ""
      ),
      padding: dayHighlightSelect(
        dayState,
        defaultHighlights,
        ["selectedStart", "selectedEnd"],
        ["0 2px 0 0", "0 0 0 2px"],
        ""
      ),
      border: `1px solid ${resolveThemeColor(borderColor, theme)}`
    };
  }

  const backgroundColor = dayHighlightSelect(
    dayState,
    defaultHighlights,
    ["selected", "today", "range", day.month === month.monthInYear],
    [
      resolveThemeColor(selectedBackground, theme),
      resolveThemeColor(todayBackground, theme),
      resolveThemeColor(rangeBackground, theme),
      resolveThemeColor("white", theme)
    ],
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
        [
          resolveThemeColor(selectedBorder, theme),
          resolveThemeColor(rangeBorder, theme),
          resolveThemeColor(todayBorder, theme)
        ],
        resolveThemeColor(borderColor, theme)
      ),
      borderCollapse: "collapse",
      borderStyle:
        dayHasHighlight(dayState, defaultHighlights, "selected") ||
        dayHasHighlight(dayState, defaultHighlights, "range") ||
        dayHasHighlight(dayState, defaultHighlights, "today")
          ? "double"
          : "solid",
      boxSizing: "border-box"
    };
  }
  return style;
};

export const defaultInnerWrapperStyleProvider = ({
  rangeBackground,
  verticalExpand,
  horizontalExpand
}: DefaultInnerWrapperColors): WrapperStyleProvider<{}> => (
  theme,
  defaultHighlights,
  dayState
) => {
  let style = {};

  if (rangeBackground) {
    style = {
      ...style,
      padding: dayHighlightSelect(
        dayState,
        defaultHighlights,
        ["selected", "range"],
        [undefined, `${verticalExpand} ${horizontalExpand}`],
        undefined
      ),
      margin: dayHighlightSelect(
        dayState,
        defaultHighlights,
        ["selected", "range"],
        [undefined, `-${verticalExpand} -${horizontalExpand}`],
        undefined
      ),
      backgroundColor: dayHighlightSelect(
        dayState,
        defaultHighlights,
        ["selected", "range"],
        [undefined, resolveThemeColor(rangeBackground, theme)],
        undefined
      )
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
  rangeTextColor
}: DefaultTextColors): TextPropsProvider<{}> => {
  return (theme, defaultHighlights, dayState, day, _, month) => {
    const isOtherMonth = day.month !== month.monthInYear;
    const color = dayHighlightSelect(
      dayState,
      defaultHighlights,
      [isOtherMonth, "selected", "range", "enabled", "disabled"],
      [
        resolveThemeColor(inOtherMonthColor, theme),
        resolveThemeColor(selectedColor, theme),
        rangeTextColor && resolveThemeColor(rangeTextColor, theme),
        undefined,
        resolveThemeColor(disabledColor, theme)
      ]
    );
    return {
      color
    };
  };
};

export const defaultCalendarTheme: CalendarTheme = {
  width: "40px",
  height: "40px",
  WeekNumber: {
    backgroundColor: "transparent",
    show: true
  },
  WeekDay: {
    textColor: "separator"
  },
  CalendarDay: {
    wrapperStyle: defaultWrapperStyleProvider({
      selectedBorder: "inputBorderFocused",
      selectedBackground: "inputBorderFocused",
      rangeBorder: "inputBorderFocusedAlt",
      rangeBackground: "inputBorderFocusedLight",
      todayBorder: "highlightBoxBorder",
      todayBackground: "highlightBoxBg"
    }),
    textProps: defaultTextPropsProvider({
      selectedColor: "white",
      disabledColor: "disabledText",
      inOtherMonthColor: "transparent"
    })
  },
  CalendarMonth: {
    SwitchButton: {
      ...defaultButtonTheme,
      width: "40px"
    },
    headerLeftIcon: faChevronLeft,
    headerRightIcon: faChevronRight
  }
};

export const extranetCalendarTheme: CalendarTheme = {
  width: "37px",
  height: "37px",
  WeekNumber: {
    backgroundColor: "transparent"
  },
  WeekDay: {
    textColor: "separator"
  },
  CalendarDay: {
    wrapperStyle: defaultWrapperStyleProvider({
      selectedBorder: "#2A7EC5",
      selectedBackground: "#2A7EC5",
      rangeBorder: "#DAE7F2",
      rangeBackground: "#E2EDF7",
      todayBorder: "#60BD2F",
      todayBackground: "#F1F9ED"
    }),
    textProps: defaultTextPropsProvider({
      selectedColor: "white",
      disabledColor: "disabledText",
      inOtherMonthColor: "transparent"
    })
  },
  CalendarMonth: {
    SwitchButton: {
      ...defaultButtonTheme,
      bgColor: "#2A7EC5",
      textColor: "#FFFFFF",
      borderRadius: "4px",
      width: "40px"
    }
  }
};

export const travelCalendarTheme: CalendarTheme = {
  width: "47px",
  height: "38px",
  WeekNumber: {
    backgroundColor: "transparent",
    show: false
  },
  WeekDay: {
    textColor: "#000000"
  },
  CalendarDay: {
    wrapperStyle: defaultWrapperStyleProvider({
      selectedBorder: "#ea143d",
      selectedBackground: "#ea143d",
      rangeBorder: "#fce7eb",
      rangeBackground: "#fce7eb",
      todayBorder: "#ea143d",
      todayBackground: "#FFFFFF",
      borderRadius: "6px",
      borderColor: "#f9f6f6",
      rangeBorderRadius: "0px"
    }),
    innerWrapperStyle: defaultInnerWrapperStyleProvider({
      rangeBackground: "#fce7eb",
      verticalExpand: "2px",
      horizontalExpand: "3px"
    }),
    textProps: defaultTextPropsProvider({
      selectedColor: "#FFFFFF",
      disabledColor: "#949494",
      inOtherMonthColor: "green",
      rangeTextColor: "#d70029"
    })
  },
  CalendarMonth: {
    cellSpacingPx: 2,
    SwitchButton: {
      ...defaultButtonTheme,
      bgColor: "##FFFFFF",
      textColor: "#000000",
      borderRadius: "36px",
      width: "36px",
      height: "36px",
      bgColorDisabled: "#f4f4f4",
      textColorDisabled: "#949494",
      borderColor: "#949494",
      borderColorDisabled: "#f4f4f4"
    },
    headerLeftIcon: faArrowLeft,
    headerRightIcon: faArrowRight
  }
};

const resolveThemeColor = (s: string, theme: Theme): string =>
  theme.colors[s] || s;
