import { Row, Spacing } from "@stenajs-webui/core";
import { getMonth, getYear, Locale, parse } from "date-fns";
import { enGB } from "date-fns/locale";
import { chunk } from "lodash-es";
import * as React from "react";
import { useMemo } from "react";
import { useHighlightToday } from "../../features/today-state/UseHighlightToday";
import {
  CalendarOnClicks,
  CalendarProps,
  CalendarUserData,
  DayState,
  Renderers,
} from "../../types/CalendarTypes";
import {
  calculateOverflowingMonth,
  getMonthInYear,
  getMonthsInYear,
  MonthData,
} from "../../util/calendar/CalendarDataFactory";
import cx from "classnames";
import styles from "./Calendar.module.css";

import { CalendarMonth } from "./CalendarMonth";
import { CalendarTheme, defaultCalendarTheme } from "./CalendarTheme";
import { CalendarDay } from "./renderers/CalendarDay";

interface CalendarPanelProps<T>
  extends CalendarProps<T>,
    CalendarOnClicks<T>,
    Renderers {
  year: number;
  month: number;
  monthRows: Array<Array<MonthData>>;
  userDataPerMonth?: CalendarUserData<T>;
  statePerMonth?: CalendarUserData<DayState>;
  width?: string;
  height?: string;
  theme?: CalendarTheme;
}

function CalendarPanel<T>({
  monthRows,
  dayComponent = CalendarDay,
  userDataPerMonth,
  statePerMonth,
  minDate,
  maxDate,
  onClickDay,
  onClickWeekDay,
  onClickWeek,
  onClickMonth,
  renderWeekDay,
  renderWeekNumber,
  headerRightContent,
  extraDayContent,
  defaultHighlights,
  showWeekNumber,
  theme = defaultCalendarTheme,
}: CalendarPanelProps<T>) {
  const minDateObj = useMemo(
    () => (minDate ? parse(minDate, "yyyy-MM-dd", new Date()) : undefined),
    [minDate]
  );

  const maxDateObj = useMemo(
    () => (maxDate ? parse(maxDate, "yyyy-MM-dd", new Date()) : undefined),
    [maxDate]
  );

  return (
    <div
      className={cx(
        styles.calendar,
        showWeekNumber && styles.weekNumberVisible
      )}
    >
      {monthRows.map((monthRow, rowIndex) => (
        <Spacing key={rowIndex}>
          <Row gap={2}>
            {monthRow.map((month) => (
              <CalendarMonth<T>
                key={month.name}
                month={month}
                dayComponent={dayComponent}
                userDataPerWeek={
                  userDataPerMonth && userDataPerMonth[month.monthString]
                }
                statePerWeek={statePerMonth && statePerMonth[month.monthString]}
                onClickDay={onClickDay}
                onClickWeekDay={onClickWeekDay}
                onClickWeek={onClickWeek}
                onClickMonth={onClickMonth}
                theme={theme}
                renderWeekNumber={renderWeekNumber}
                renderWeekDay={renderWeekDay}
                headerRightContent={headerRightContent}
                extraDayContent={extraDayContent}
                defaultHighlights={defaultHighlights}
                minDate={minDateObj}
                maxDate={maxDateObj}
                showWeekNumber={showWeekNumber ?? false}
              />
            ))}
          </Row>
        </Spacing>
      ))}
    </div>
  );
}

export function Calendar<T>(props: CalendarProps<T>) {
  const initialDate = getInitialDate(props.year, props.month, props.date);
  const { year, month } = calculateOverflowingMonth(
    initialDate.year,
    initialDate.month
  );
  const monthRows = getMonthRows(
    year,
    month,
    props.locale ?? enGB,
    props.numMonths,
    props.monthsPerRow
  );

  const statePerMonth = useHighlightToday(
    props.highlightToday,
    props.statePerMonth
  );

  return (
    <CalendarPanel<T>
      year={year}
      month={month}
      monthRows={monthRows}
      {...props}
      statePerMonth={statePerMonth}
    />
  );
}

const getInitialDate = (year?: number, month?: number, date?: Date) => {
  if (month && year) {
    return {
      month,
      year,
    };
  }
  if (date) {
    return {
      month: getMonth(date),
      year: getYear(date),
    };
  }
  const now = new Date();
  return {
    month: getMonth(now),
    year: getYear(now),
  };
};

const getMonthRows = (
  year: number,
  month: number,
  locale: Locale,
  numMonths?: number,
  monthsPerRow?: number
): Array<Array<MonthData>> => {
  if (numMonths == null) {
    return [[getMonthInYear(year, month, locale)]];
  }
  if (monthsPerRow == null) {
    return [getMonthsInYear(year, month, numMonths, locale)];
  }
  return chunk(getMonthsInYear(year, month, numMonths, locale), monthsPerRow);
};
