import { StandardButton } from "@stenajs-webui/elements";
import * as React from "react";
import { Calendar } from "../../components/calendar/Calendar";
import { defaultCalendarTheme } from "../../components/calendar/CalendarTheme";
import { CalendarProps } from "../../types/CalendarTypes";
import { useMonthSwitcherLogic } from "./hooks/UseMonthSwitcherLogic";
import { WithMonthSwitcherBelow } from "./MonthSwitcherBelow";

export type MonthSwitcherPlacement = "header" | "below";

export interface CalendarWithMonthSwitcherProps<T> extends CalendarProps<T> {
  monthSwitcherPlacement?: MonthSwitcherPlacement;
  startDateInFocus?: Date;
}

export function CalendarWithMonthSwitcher<T>({
  monthSwitcherPlacement,
  startDateInFocus,
  theme = defaultCalendarTheme,
  ...calendarProps
}: CalendarWithMonthSwitcherProps<T>) {
  const { nextMonth, prevMonth, date } = useMonthSwitcherLogic(
    startDateInFocus,
    calendarProps.monthsPerRow,
    calendarProps.numMonths
  );

  const placement = fallbackIfNoPlacement(
    monthSwitcherPlacement,
    calendarProps.numMonths
  );

  switch (placement) {
    case "below": {
      return (
        <WithMonthSwitcherBelow
          theme={theme}
          nextMonth={nextMonth}
          prevMonth={prevMonth}
        >
          <Calendar<T> {...calendarProps} theme={theme} date={date} />
        </WithMonthSwitcherBelow>
      );
    }
    case "header": {
      return (
        <Calendar<T>
          {...calendarProps}
          theme={theme}
          date={date}
          headerLeftContent={
            <StandardButton
              onClick={prevMonth}
              leftIcon={theme.CalendarMonth.HeaderLeftIcon}
              buttonTheme={theme.CalendarMonth.SwitchButton}
              width={
                theme.CalendarMonth.SwitchButton &&
                theme.CalendarMonth.SwitchButton.width
              }
            />
          }
          headerRightContent={
            <StandardButton
              onClick={nextMonth}
              leftIcon={theme.CalendarMonth.HeaderRightIcon}
              buttonTheme={theme.CalendarMonth.SwitchButton}
              width={
                theme.CalendarMonth.SwitchButton &&
                theme.CalendarMonth.SwitchButton.width
              }
            />
          }
        />
      );
    }
    default: {
      return <Calendar<T> {...calendarProps} theme={theme} date={date} />;
    }
  }
}

const fallbackIfNoPlacement = (
  monthSwitcherPlacement: MonthSwitcherPlacement | undefined,
  numMonths: number | undefined
): MonthSwitcherPlacement => {
  return monthSwitcherPlacement || (numMonths || 1) > 1 ? "below" : "header";
};
