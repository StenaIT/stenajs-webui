import { Locale, setWeek, startOfWeek } from "date-fns";
import { enGB } from "date-fns/locale";
import { useCallback, useMemo, useState } from "react";
import { useInternalPanelState } from "../../../features/internal-panel-state/UseInternalPanelState";
import { CalendarWithMonthSwitcherProps } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { OnClickDay, OnClickWeek } from "../../../types/CalendarTypes";
import {
  getWeekForDate,
  WeekData,
} from "../../../util/calendar/CalendarDataFactory";
import { addWeekRangeHighlights } from "../../../util/calendar/StateModifier";
import { SingleWeekCalendarProps } from "./SingleWeekCalendar";

export const useSingleWeekSelection = <T>({
  onChange,
  value,
  statePerMonth,
  onChangePanel,
  locale = enGB,
}: SingleWeekCalendarProps<T>): CalendarWithMonthSwitcherProps<T> => {
  const [dateInFocus, setDateInFocus] = useState(() => {
    const week = getWeekDataFromWeekString(value, locale);
    if (!week) {
      return new Date();
    }
    return week.days[0].date;
  });
  const { currentPanel, setCurrentPanel } =
    useInternalPanelState(onChangePanel);

  const onClickDay = useCallback<OnClickDay<T>>(
    (day) => {
      if (onChange) {
        onChange(getWeekStringFromWeekData(getWeekForDate(day.date, locale)));
      }
    },
    [locale, onChange],
  );
  const onClickWeek = useCallback<OnClickWeek>(
    (week) => {
      if (onChange) {
        onChange(getWeekStringFromWeekData(week));
      }
    },
    [onChange],
  );

  const statePerMonthWithSelection = useMemo(() => {
    const weekData = getWeekDataFromWeekString(value, locale);
    return weekData
      ? addWeekRangeHighlights(statePerMonth, weekData)
      : statePerMonth;
  }, [value, locale, statePerMonth]);

  const date = useMemo(() => {
    const week = getWeekDataFromWeekString(value, locale);
    if (!week) {
      return new Date();
    }
    return week.days[0].date;
  }, [locale, value]);

  return {
    statePerMonth: statePerMonthWithSelection,
    date,
    dateInFocus,
    setDateInFocus,
    onClickDay,
    onClickWeek,
    currentPanel,
    setCurrentPanel,
  };
};

const getWeekStringFromWeekData = (
  week: WeekData | undefined,
): string | undefined => {
  if (!week) {
    return undefined;
  }
  return `${week.endYear}-${week.weekNumber}`;
};

const getWeekDataFromWeekString = (
  week: string | undefined,
  locale: Locale,
): WeekData | undefined => {
  if (!week) {
    return undefined;
  }
  const parts = week.split("-");
  const weekNumber = parseInt(parts[1], 10);
  const year = parseInt(parts[0], 10);
  const date = new Date();
  date.setFullYear(year);
  const firstDateOfWeek = startOfWeek(setWeek(date, weekNumber), { locale });
  return getWeekForDate(firstDateOfWeek, locale);
};
