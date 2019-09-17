import { useCallback, useMemo } from "react";
import { CalendarWithMonthSwitcherProps } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import {
  getStartDateOfISOWeek,
  getWeekForDate,
  WeekData
} from "../../../util/calendar/CalendarDataFactory";
import { addWeekStateHighlights } from "../../../util/calendar/StateModifier";
import { SingleWeekCalendarProps } from "./SingleWeekCalendar";
import { useTranslation } from "../../../util/date/hooks/UseTranslation";

export const useSingleWeekSelection = <T>({
  onChange,
  value,
  statePerMonth
}: SingleWeekCalendarProps<T>): CalendarWithMonthSwitcherProps<T> => {
  const { locale } = useTranslation();
  const onClickDay = useCallback(
    day => {
      if (onChange) {
        onChange(getWeekStringFromWeekData(getWeekForDate(day.date, locale)));
      }
    },
    [onChange, locale]
  );
  const onClickWeek = useCallback(
    week => {
      if (onChange) {
        onChange(getWeekStringFromWeekData(week));
      }
    },
    [onChange]
  );

  const statePerMonthWithSelection = useMemo(() => {
    const weekData = getWeekDataFromWeekString(value, locale);
    return weekData
      ? addWeekStateHighlights(statePerMonth, weekData, ["selected"])
      : statePerMonth;
  }, [value, statePerMonth, locale]);

  const date = useMemo(() => {
    const week = getWeekDataFromWeekString(value, locale);
    if (!week) {
      return new Date();
    }
    return week.days[0].date;
  }, [value, locale]);

  return {
    statePerMonth: statePerMonthWithSelection,
    date,
    startDateInFocus: date,
    onClickDay,
    onClickWeek
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
  week: string | undefined,
  locale: Locale
): WeekData | undefined => {
  if (!week) {
    return undefined;
  }
  const parts = week.split("-");
  const weekNumber = parseInt(parts[1], 10);
  const year = parseInt(parts[0], 10);
  return getWeekForDate(getStartDateOfISOWeek(weekNumber, year), locale);
};
