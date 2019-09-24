import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { defaultButtonTheme } from "@stenajs-webui/elements";
import {
  defaultTextPropsProvider,
  defaultWrapperStyleProvider,
  CalendarTheme,
  resolveThemeColor,
  CalendarWrapperStyleProvider
} from "./CalendarTheme";

import { dayHighlightSelect } from "../../util/calendar/StateHelper";

interface DefaultInnerWrapperColors {
  rangeBackground: string;
  verticalExpand: string;
  horizontalExpand: string;
}

type ChainStyleProviders = (
  providers: CalendarWrapperStyleProvider<{}>[]
) => CalendarWrapperStyleProvider<{}>;

const chainStyleProviders: ChainStyleProviders = providers => (
  ...providerArgs
) =>
  providers.reduce(
    (prev, current) => ({
      ...prev,
      ...current(...providerArgs)
    }),
    {}
  );

const travelInnerWrapperStyleProvider = ({
  rangeBackground,
  verticalExpand,
  horizontalExpand
}: DefaultInnerWrapperColors): CalendarWrapperStyleProvider<{}> => (
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

export interface CalendarTravelWrapperColors {
  borderColor?: string;
  borderRadius?: string;
  rangeBorderRadius?: string;
}

export const travelDefaultWrapperStyleProvider = ({
  borderRadius,
  rangeBorderRadius
}: CalendarTravelWrapperColors): CalendarWrapperStyleProvider<{}> => (
  _,
  defaultHighlights,
  dayState
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
      )
    };
  }

  return style;
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
    wrapperStyle: chainStyleProviders([
      defaultWrapperStyleProvider({
        selectedBorder: "#ea143d",
        selectedBackground: "#ea143d",
        rangeBorder: "#fce7eb",
        rangeBackground: "#fce7eb",
        todayBorder: "transparent",
        todayBackground: "#FFFFFF",
        borderRadius: "6px",
        borderColor: "#f9f6f6",
        rangeBorderRadius: "0px"
      }),
      travelDefaultWrapperStyleProvider({
        borderColor: "#f9f6f6",
        borderRadius: "6px",
        rangeBorderRadius: "0px"
      })
    ]),
    innerWrapperStyle: travelInnerWrapperStyleProvider({
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
    cellSpacing: "2px",
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
