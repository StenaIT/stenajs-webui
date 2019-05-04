import { Omit } from "@stenajs-webui/core";
import {
  ComponentEnhancer,
  compose,
  pure,
  withHandlers,
  withProps
} from "recompose";
import { CalendarProps } from "../types/CalendarTypes";
import { DayData } from "../util/CalendarDataFactory";
import { addDayStateHighlights } from "../util/StateModifier";
import { WithMonthSwitcherProps } from "./month-switcher/MonthSwitcher";
import { MonthSwitcherLogicOuterProps } from "./month-switcher/MonthSwitcherLogic";

export type __C359812313518 = ComponentEnhancer<{}, {}>;

export type SingleDateCalendarProps<T> = Omit<CalendarProps<T>, "theme"> &
  MonthSwitcherLogicOuterProps &
  OnChangePropsSingleDateSelection &
  WithMonthSwitcherProps;

export interface OnChangePropsSingleDateSelection {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
}

interface SelectionLogicHandlers {
  onClickDay: (day: DayData) => void;
}

const addSelectionLogic = withHandlers<
  SingleDateCalendarProps<{}>,
  SelectionLogicHandlers
>({
  onClickDay: ({ onChange }) => day => {
    if (onChange) {
      onChange(day.date);
    }
  }
});

const buildSelectionState = withProps<
  Pick<CalendarProps<{}>, "statePerMonth">,
  SingleDateCalendarProps<{}>
>(({ value, statePerMonth }) => {
  return {
    statePerMonth: value
      ? addDayStateHighlights(statePerMonth, value, ["selected"])
      : statePerMonth,
    date: value,
    startDateInFocus: value
  };
});

export const withSingleDateSelection = compose(
  addSelectionLogic,
  pure,
  buildSelectionState
);
