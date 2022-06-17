import { useCallback, useMemo, useState } from "react";
import { CalendarWithMonthSwitcherProps } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import {
  getStartDateOfISOWeek,
  getWeekForDate,
  WeekData,
} from "../../../util/calendar/CalendarDataFactory";
import { addWeekRangeHighlights } from "../../../util/calendar/StateModifier";
import { SingleWeekCalendarProps } from "./SingleWeekCalendar";
import { useInternalPanelState } from "../../../features/internal-panel-state/UseInternalPanelState";
import { OnClickDay, OnClickWeek } from "../../../types/CalendarTypes";

export const useSingleWeekSelection = <T>({
  onChange,
  value,
  statePerMonth,
  onChangePanel,
}: SingleWeekCalendarProps<T>): CalendarWithMonthSwitcherProps<T> => {
  const [dateInFocus, setDateInFocus] = useState(() => {
    const week = getWeekDataFromWeekString(value);
    if (!week) {
      return new Date();
    }
    return week.days[0].date;
  });
  const { currentPanel, setCurrentPanel } = useInternalPanelState(
    onChangePanel
  );

  const onClickDay = useCallback<OnClickDay<T>>(
    (day) => {
      if (onChange) {
        onChange(getWeekStringFromWeekData(getWeekForDate(day.date)));
      }
    },
    [onChange]
  );
  const onClickWeek = useCallback<OnClickWeek>(
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
      ? addWeekRangeHighlights(statePerMonth, weekData)
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
    currentPanel,
    setCurrentPanel,
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
