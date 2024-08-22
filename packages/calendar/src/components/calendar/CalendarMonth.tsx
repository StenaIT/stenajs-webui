import { Box, Row, Text } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import {
  CalendarDayProps,
  CalendarOnClicks,
  CalendarUserMonthData,
  DayState,
  DayStateHighlight,
  ExtraDayContentProps,
  OptionalMinMaxDates,
  Renderers,
} from "../../types/CalendarTypes";
import {
  DayData,
  MonthData,
  WeekData,
} from "../../util/calendar/CalendarDataFactory";
import { CalendarTheme, defaultCalendarTheme } from "./CalendarTheme";
import { WeekDayCell } from "./renderers/WeekDayCell";
import { CalendarDay } from "./renderers/CalendarDay";
import { FlatButton, stenaAngleDown } from "@stenajs-webui/elements";
import { WeekNumberCell } from "./renderers/WeekNumberCell";
import { DisabledDayWrapper } from "./DisabledDayWrapper";

export interface CalendarMonthProps<T>
  extends CalendarOnClicks<T>,
    Renderers,
    OptionalMinMaxDates {
  month: MonthData;
  dayComponent?: React.ComponentType<CalendarDayProps<T>>;
  userDataPerWeek?: CalendarUserMonthData<T>;
  statePerWeek?: CalendarUserMonthData<DayState>;
  theme?: CalendarTheme;
  headerRightContent?: ReactNode;
  extraDayContent?: React.ComponentType<ExtraDayContentProps<T>>;
  defaultHighlights?: Array<DayStateHighlight>;
  showWeekNumber: boolean;
}

export function CalendarMonth<T>({
  month,
  dayComponent = CalendarDay,
  statePerWeek,
  userDataPerWeek,
  minDate,
  maxDate,
  onClickDay,
  onClickWeek,
  onClickWeekDay,
  onClickMonth,
  renderWeekNumber,
  renderWeekDay,
  headerRightContent,
  theme = defaultCalendarTheme,
  extraDayContent,
  defaultHighlights,
  showWeekNumber,
}: CalendarMonthProps<T>) {
  return (
    <>
      <Box alignItems={"stretch"}>
        <Row
          justifyContent={headerRightContent ? "space-between" : "center"}
          alignItems={"center"}
        >
          <Row justifyContent={"center"} alignItems={"center"}>
            {onClickMonth ? (
              <FlatButton
                onClick={() => onClickMonth(month)}
                label={month.name + " " + String(month.year)}
                rightIcon={stenaAngleDown}
              />
            ) : (
              <Text whiteSpace={"nowrap"}>
                {month.name} {month.year}
              </Text>
            )}
          </Row>

          {headerRightContent && (
            <Box alignItems={"center"}>{headerRightContent}</Box>
          )}
        </Row>

        <table>
          <tbody>
            <tr>
              {showWeekNumber && (
                <td>
                  <Box width={theme.width} height={theme.height} />
                </td>
              )}
              {month.weeks[0].days.map((day: DayData) => (
                <td key={day.name}>
                  {renderWeekDay ? (
                    renderWeekDay(day.name, theme, onClickWeekDay)
                  ) : (
                    <WeekDayCell
                      day={day}
                      onClickWeekDay={onClickWeekDay}
                      theme={theme}
                    />
                  )}
                </td>
              ))}
            </tr>
            {month.weeks.map((week: WeekData) => (
              <tr key={week.weekNumber}>
                {showWeekNumber && (
                  <td>
                    {renderWeekNumber ? (
                      renderWeekNumber(week, theme, onClickWeek)
                    ) : (
                      <WeekNumberCell
                        week={week}
                        onClickWeek={onClickWeek}
                        theme={theme}
                      />
                    )}
                  </td>
                )}
                {week.days.map((day) => (
                  <DisabledDayWrapper
                    dayComponent={dayComponent}
                    key={day.dateString}
                    day={day}
                    week={week}
                    month={month}
                    dayState={
                      statePerWeek &&
                      statePerWeek[week.weekNumber] &&
                      statePerWeek[week.weekNumber][day.dayOfMonth]
                    }
                    userData={
                      userDataPerWeek &&
                      userDataPerWeek[week.weekNumber] &&
                      userDataPerWeek[week.weekNumber][day.dayOfMonth]
                    }
                    onClickDay={onClickDay}
                    theme={theme}
                    extraDayContent={extraDayContent}
                    defaultHighlights={defaultHighlights}
                    minDate={minDate}
                    maxDate={maxDate}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </>
  );
}
