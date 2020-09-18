import { Row, Space, Spacing } from "@stenajs-webui/core";
import { getMonth, getYear } from "date-fns";
import { chunk } from "lodash";
import * as React from "react";
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

function CalendarPanel<T extends {}>({
  monthRows,
  dayComponent = CalendarDay,
  userDataPerMonth,
  statePerMonth,
  onClickDay,
  onClickWeekDay,
  onClickWeek,
  onClickMonth,
  onClickYear,
  renderWeekDay,
  renderWeekNumber,
  headerLeftContent,
  headerRightContent,
  extraDayContent,
  defaultHighlights,
  theme = defaultCalendarTheme,
}: CalendarPanelProps<T>) {
  return (
    <div>
      {monthRows.map((monthRow, rowIndex) => (
        <Spacing key={rowIndex}>
          <Row>
            {monthRow.map((month, index) => (
              <React.Fragment key={month.name}>
                {index > 0 && <Space />}
                <CalendarMonth<T>
                  month={month}
                  dayComponent={dayComponent}
                  userDataPerWeek={
                    userDataPerMonth && userDataPerMonth[month.monthString]
                  }
                  statePerWeek={
                    statePerMonth && statePerMonth[month.monthString]
                  }
                  onClickDay={onClickDay}
                  onClickWeekDay={onClickWeekDay}
                  onClickWeek={onClickWeek}
                  onClickMonth={onClickMonth}
                  onClickYear={onClickYear}
                  theme={theme}
                  renderWeekNumber={renderWeekNumber}
                  renderWeekDay={renderWeekDay}
                  headerLeftContent={headerLeftContent}
                  headerRightContent={headerRightContent}
                  extraDayContent={extraDayContent}
                  defaultHighlights={defaultHighlights}
                />
              </React.Fragment>
            ))}
          </Row>
        </Spacing>
      ))}
    </div>
  );
}

export function Calendar<T extends {}>(props: CalendarProps<T>) {
  const initialDate = getInitialDate(props.year, props.month, props.date);
  const { year, month } = calculateOverflowingMonth(
    initialDate.year,
    initialDate.month
  );
  const monthRows = getMonthRows(
    year,
    month,
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
  numMonths?: number,
  monthsPerRow?: number
): Array<Array<MonthData>> => {
  if (numMonths == null) {
    return [[getMonthInYear(year, month)]];
  }
  if (monthsPerRow == null) {
    return [getMonthsInYear(year, month, numMonths)];
  }
  return chunk(getMonthsInYear(year, month, numMonths), monthsPerRow);
};
