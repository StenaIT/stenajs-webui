import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { StandardButton } from "@stenajs-webui/elements";
import * as React from "react";
import { ComponentEnhancer, compose, withProps } from "recompose";
import { defaultCalendarTheme } from "../../components/CalendarTheme";
import {
  CalendarHeaderContentProps,
  CalendarProps
} from "../../types/CalendarTypes";
import {
  MonthSwitcherHandlerProps,
  MonthSwitcherStateProps,
  withMonthSwitcherLogic
} from "./MonthSwitcherLogic";

export type __C3135136785123518 = ComponentEnhancer<{}, {}>;

type InnerProps = CalendarProps<{}> &
  MonthSwitcherStateProps &
  MonthSwitcherHandlerProps;

const withSwitchButtonsLeftRight = withProps<
  CalendarHeaderContentProps,
  InnerProps
>(({ prevMonth, nextMonth, theme = defaultCalendarTheme }) => ({
  headerLeftContent: (
    <StandardButton
      onClick={prevMonth}
      leftIcon={faChevronLeft}
      buttonTheme={theme.CalendarMonth.SwitchButton}
      width={
        theme.CalendarMonth.SwitchButton &&
        theme.CalendarMonth.SwitchButton.width
      }
    />
  ),
  headerRightContent: (
    <StandardButton
      onClick={nextMonth}
      leftIcon={faChevronRight}
      buttonTheme={theme.CalendarMonth.SwitchButton}
      width={
        theme.CalendarMonth.SwitchButton &&
        theme.CalendarMonth.SwitchButton.width
      }
    />
  )
}));

export const withMonthSwitcherInHeader = compose(
  withMonthSwitcherLogic,
  withSwitchButtonsLeftRight
);
