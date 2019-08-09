import * as React from "react";
import { Calendar } from "../../components/calendar/Calendar";
import { defaultCalendarTheme } from "../../components/calendar/CalendarTheme";
import { CalendarProps } from "../../types/CalendarTypes";
import { useMonthSwitcherInHeader } from "./hooks/UseMonthSwitcherInHeader";
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
  const headerProps = useMonthSwitcherInHeader<T>(
    monthSwitcherPlacement === "header",
    theme,
    prevMonth,
    nextMonth
  );
  switch (monthSwitcherPlacement) {
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
          {...headerProps}
          theme={theme}
          date={date}
        />
      );
    }
    default: {
      return <Calendar<T> {...calendarProps} theme={theme} date={date} />;
    }
  }
}
