import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { StandardButton } from "@stenajs-webui/elements";
import * as React from "react";
import { useMemo } from "react";
import { CalendarTheme } from "../../../components/calendar/CalendarTheme";
import { CalendarProps } from "../../../types/CalendarTypes";

export const useMonthSwitcherInHeader = <T extends {}>(
  enabled: boolean,
  theme: CalendarTheme,
  prevMonth: () => void,
  nextMonth: () => void
): Partial<CalendarProps<T>> => {
  return useMemo(() => {
    if (!enabled) {
      return {
        headerLeftContent: undefined,
        headerRightContent: undefined
      };
    }
    return {
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
    };
  }, [enabled, theme, prevMonth, nextMonth]);
};
