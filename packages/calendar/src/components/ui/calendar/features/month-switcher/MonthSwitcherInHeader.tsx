import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { StandardButton } from "@stenajs-webui/elements";
import * as React from "react";
import { ComponentEnhancer, compose, withProps } from "recompose";
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
>(({ prevMonth, nextMonth, theme }) => ({
  headerLeftContent: (
    <StandardButton
      onClick={prevMonth}
      leftIcon={faChevronLeft}
      buttonTheme={
        theme && theme.CalendarMonth.SwitchButton
          ? theme.CalendarMonth.SwitchButton
          : undefined
      }
      width={
        theme && theme.CalendarMonth.SwitchButton
          ? theme.CalendarMonth.SwitchButton.width
          : undefined
      }
    />
  ),
  headerRightContent: (
    <StandardButton
      onClick={nextMonth}
      leftIcon={faChevronRight}
      buttonTheme={
        theme && theme.CalendarMonth.SwitchButton
          ? theme.CalendarMonth.SwitchButton
          : undefined
      }
      width={
        theme && theme.CalendarMonth.SwitchButton
          ? theme.CalendarMonth.SwitchButton.width
          : undefined
      }
    />
  )
}));

export const withMonthSwitcherInHeader = compose(
  withMonthSwitcherLogic,
  withSwitchButtonsLeftRight
);
