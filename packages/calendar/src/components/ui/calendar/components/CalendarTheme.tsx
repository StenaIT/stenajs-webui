import { CSSProperties } from 'react';
import { defaultColors } from '../../../../../themes/default-values/DefaultColors';
import { ButtonTheme, defaultButtonTheme } from '../../../buttons/ButtonTheme';
import { DefaultTextProps } from '../../../text/DefaultText';
import { DayState, DayStateHighlight } from '../types/CalendarTypes';
import { DayData, MonthData, WeekData } from '../util/CalendarDataFactory';
import { dayHasHighlight, dayHighlightSelect } from '../util/StateHelper';

export interface CalendarTheme<TUserData = {}> {
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
}

export interface SwitchButtonTheme extends ButtonTheme {
  height?: string;
  width?: string;
}

export interface CalendarMonthTheme {
  headerTextColor?: string;
  SwitchButton?: SwitchButtonTheme;
}

export interface WeekDayTheme {
  textColor?: string;
}

type CalendarStyleProvider<TUserData, TResult> = (
  defaultHighlights: Array<DayStateHighlight> | undefined,
  dayState: DayState | undefined,
  day: DayData,
  week: WeekData,
  month: MonthData,
  userData?: TUserData,
) => TResult;

type WrapperStyleProvider<TUserData> = CalendarStyleProvider<
  TUserData,
  CSSProperties | undefined
>;

type TextPropsProvider<TUserData> = CalendarStyleProvider<
  TUserData,
  DefaultTextProps | undefined
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
}

export const defaultWrapperStyleProvider = ({
  selectedBackground,
  todayBackground,
  rangeBackground,
  selectedBorder,
  rangeBorder,
  todayBorder,
}: DefaultWrapperColors): WrapperStyleProvider<{}> => (
  defaultHighlights,
  dayState,
  day,
  week,
  month,
) => {
  const backgroundColor = dayHighlightSelect(
    dayState,
    defaultHighlights,
    ['selected', 'today', 'range', day.month === month.monthInYear],
    [selectedBackground, todayBackground, rangeBackground, defaultColors.white],
    'transparent',
  );

  if (day.month === month.monthInYear) {
    return {
      backgroundColor,
      borderWidth: '1px',
      borderColor: dayHighlightSelect(
        dayState,
        defaultHighlights,
        ['selected', 'range', 'today'],
        [selectedBorder, rangeBorder, todayBorder],
        defaultColors.separatorLight,
      ),
      borderCollapse: 'collapse',
      borderStyle:
        dayHasHighlight(dayState, defaultHighlights, 'selected') ||
        dayHasHighlight(dayState, defaultHighlights, 'range') ||
        dayHasHighlight(dayState, defaultHighlights, 'today')
          ? 'double'
          : 'solid',
      boxSizing: 'border-box',
    };
  }
  return undefined;
};

interface DefaultTextColors {
  disabledColor: string;
  inOtherMonthColor: string;
  selectedColor: string;
}

export const defaultTextPropsProvider = ({
  selectedColor,
  disabledColor,
  inOtherMonthColor,
}: DefaultTextColors): TextPropsProvider<{}> => {
  return (defaultHighlights, dayState, day, week, month) => {
    const isOtherMonth = day.month !== month.monthInYear;
    const color = dayHighlightSelect(
      dayState,
      defaultHighlights,
      [isOtherMonth, 'selected', 'enabled', 'disabled'],
      [inOtherMonthColor, selectedColor, undefined, disabledColor],
    );
    return {
      color,
    };
  };
};

export const defaultCalendarTheme: CalendarTheme = {
  width: '40px',
  height: '40px',
  WeekNumber: {
    backgroundColor: 'transparent',
  },
  WeekDay: {
    textColor: defaultColors.separator,
  },
  CalendarDay: {
    wrapperStyle: defaultWrapperStyleProvider({
      selectedBorder: defaultColors.inputBorderFocused,
      selectedBackground: defaultColors.inputBorderFocused,
      rangeBorder: defaultColors.inputBorderFocusedAlt,
      rangeBackground: defaultColors.inputBorderFocusedLight,
      todayBorder: defaultColors.highlightBoxBorder,
      todayBackground: defaultColors.highlightBoxBg,
    }),
    textProps: defaultTextPropsProvider({
      selectedColor: defaultColors.white,
      disabledColor: defaultColors.disabledText,
      inOtherMonthColor: 'transparent',
    }),
  },
  CalendarMonth: {
    SwitchButton: {
      ...defaultButtonTheme,
    },
  },
};

export const extranetCalendarTheme: CalendarTheme = {
  width: '37px',
  height: '37px',
  WeekNumber: {
    backgroundColor: 'transparent',
  },
  WeekDay: {
    textColor: defaultColors.separator,
  },
  CalendarDay: {
    wrapperStyle: defaultWrapperStyleProvider({
      selectedBorder: '#2A7EC5',
      selectedBackground: '#2A7EC5',
      rangeBorder: '#DAE7F2',
      rangeBackground: '#E2EDF7',
      todayBorder: '#60BD2F',
      todayBackground: '#F1F9ED',
    }),
    textProps: defaultTextPropsProvider({
      selectedColor: defaultColors.white,
      disabledColor: defaultColors.disabledText,
      inOtherMonthColor: 'transparent',
    }),
  },
  CalendarMonth: {
    SwitchButton: {
      ...defaultButtonTheme,
      bgColor: '#2A7EC5',
      textColor: '#FFFFFF',
      borderRadius: '4px',
      width: '26px',
    },
  },
};
