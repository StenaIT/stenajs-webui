import { Row, Space, Spacing } from "@stenajs-webui/core";
import { getMonth, getYear } from "date-fns";
import { chunk } from "lodash";
import * as React from "react";
import {
  compose,
  InferableComponentEnhancerWithProps,
  mapProps,
  withProps
} from "recompose";
import {
  CalendarOnClicks,
  CalendarProps,
  CalendarPropsWithDateSet,
  CalendarUserData,
  DayState,
  Renderers
} from "../types/CalendarTypes";
import {
  calculateOverflowingMonth,
  getMonthInYear,
  getMonthsInYear,
  MonthData
} from "../util/CalendarDataFactory";
import { CalendarMonth } from "./CalendarMonth";
import { CalendarTheme, defaultCalendarTheme } from "./CalendarTheme";
import { CalendarDay } from "./renderers/CalendarDay";

export type __C13581358 = InferableComponentEnhancerWithProps<{}, {}>;

interface InnerProps<T>
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

const CalendarComponent = <T extends {}>({
  monthRows,
  dayComponent = CalendarDay,
  userDataPerMonth,
  statePerMonth,
  onClickDay,
  onClickWeekDay,
  onClickWeek,
  renderWeekDay,
  renderWeekNumber,
  headerLeftContent,
  headerRightContent,
  extraDayContent,
  defaultHighlights,
  theme = defaultCalendarTheme
}: InnerProps<T>) => (
  <div>
    {monthRows.map((monthRow, rowIndex) => (
      <Spacing key={rowIndex}>
        <Row>
          {monthRow.map((month, index) => (
            <React.Fragment key={month.name}>
              {index > 0 && <Space />}
              <CalendarMonth
                month={month}
                dayComponent={dayComponent}
                userDataPerWeek={
                  userDataPerMonth && userDataPerMonth[month.monthString]
                }
                statePerWeek={statePerMonth && statePerMonth[month.monthString]}
                onClickDay={onClickDay}
                onClickWeekDay={onClickWeekDay}
                onClickWeek={onClickWeek}
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

const applyDefaultDates = <T extends {}>() =>
  mapProps<CalendarPropsWithDateSet<T>, CalendarProps<T>>(props => {
    const { month, year, date } = props;
    if (month && year) {
      return {
        ...props,
        month,
        year
      };
    }
    if (date) {
      return {
        ...props,
        month: getMonth(date),
        year: getYear(date)
      };
    }
    const now = new Date();
    return {
      ...props,
      month: getMonth(now),
      year: getYear(now)
    };
  });

const handleOverflowingMonth = <T extends {}>() =>
  withProps(({ month, year }: InnerProps<T>) =>
    calculateOverflowingMonth(year, month)
  );

const createCalendarMonths = <T extends {}>() =>
  withProps<Partial<InnerProps<T>>, CalendarPropsWithDateSet<T>>(
    ({ numMonths, monthsPerRow, year, month }) => {
      if (numMonths == null) {
        return {
          monthRows: [[getMonthInYear(year, month)]]
        };
      }
      if (monthsPerRow == null) {
        return {
          monthRows: [getMonthsInYear(year, month, numMonths)]
        };
      }
      return {
        monthRows: chunk(getMonthsInYear(year, month, numMonths), monthsPerRow)
      };
    }
  );

export const createCalendar = <T extends {}>() =>
  compose<InnerProps<T>, CalendarProps<T>>(
    applyDefaultDates(),
    handleOverflowingMonth(),
    createCalendarMonths()
  )(CalendarComponent);
