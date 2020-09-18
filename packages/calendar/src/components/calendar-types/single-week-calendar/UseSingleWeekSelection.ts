import { useCallback, useMemo, useState } from "react";
import { CalendarWithMonthSwitcherProps } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import {
  getStartDateOfISOWeek,
  getWeekForDate,
  WeekData,
} from "../../../util/calendar/CalendarDataFactory";
import { addWeekStateHighlights } from "../../../util/calendar/StateModifier";

import { SingleWeekCalendarProps } from "./SingleWeekCalendar";

export const useSingleWeekSelection = <T>({
  onChange,
  value,
  statePerMonth,
}: SingleWeekCalendarProps<T>): CalendarWithMonthSwitcherProps<T> => {
  const [dateInFocus, setDateInFocus] = useState(() => {
    const week = getWeekDataFromWeekString(value);
    if (!week) {
      return new Date();
    }
    return week.days[0].date;
  });

  const onClickDay = useCallback(
    (day) => {
      if (onChange) {
        onChange(getWeekStringFromWeekData(getWeekForDate(day.date)));
      }
    },
    [onChange]
  );
  const onClickWeek = useCallback(
    (week) => {
      if (onChange) {
        onChange(getWeekStringFromWeekData(week));
      }
    },
    [onChange]
  );

  const statePerMonthWithSelection = useMemo(() => {
    const weekData = getWeekDataFromWeekString(value);
    return weekData
      ? addWeekStateHighlights(statePerMonth, weekData, ["selected"])
      : statePerMonth;
  }, [value, statePerMonth]);

  const date = useMemo(() => {
    const week = getWeekDataFromWeekString(value);
    if (!week) {
      return new Date();
    }
    return week.days[0].date;
  }, [value]);

  return {
    statePerMonth: statePerMonthWithSelection,
    date,
    dateInFocus,
    setDateInFocus,
    onClickDay,
    onClickWeek,
  };
};

const getWeekStringFromWeekData = (
  week: WeekData | undefined
): string | undefined => {
  if (!week) {
    return undefined;
  }
  return `${week.endYear}-${week.weekNumber}`;
};

const getWeekDataFromWeekString = (
  week: string | undefined
): WeekData | undefined => {
  if (!week) {
    return undefined;
  }
  const parts = week.split("-");
  const weekNumber = parseInt(parts[1], 10);
  const year = parseInt(parts[0], 10);
  return getWeekForDate(getStartDateOfISOWeek(weekNumber, year));
};
