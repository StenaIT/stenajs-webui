import { Box, Row, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import {
  CalendarDayProps,
  CalendarOnClicks,
  CalendarUserMonthData,
  DayState,
  DayStateHighlight,
  ExtraDayContentProps,
  Renderers,
} from "../../types/CalendarTypes";
import {
  DayData,
  MonthData,
  WeekData,
} from "../../util/calendar/CalendarDataFactory";
import { CalendarTheme, defaultCalendarTheme } from "./CalendarTheme";
import { CalendarWeek } from "./CalendarWeek";
import { WeekDayCell } from "./renderers/WeekDayCell";
import { CalendarDay } from "./renderers/CalendarDay";
import { FlatButton } from "@stenajs-webui/elements";

export interface CalendarMonthProps<T> extends CalendarOnClicks<T>, Renderers {
  month: MonthData;
  dayComponent?: React.ComponentType<CalendarDayProps<T>>;
  userDataPerWeek?: CalendarUserMonthData<T>;
  statePerWeek?: CalendarUserMonthData<DayState>;
  theme?: CalendarTheme;
  headerLeftContent?: React.ReactElement<{}>;
  headerRightContent?: React.ReactElement<{}>;
  extraDayContent?: React.ComponentType<ExtraDayContentProps<T>>;
  defaultHighlights?: Array<DayStateHighlight>;
}

export function CalendarMonth<T>({
  month,
  dayComponent = CalendarDay,
  statePerWeek,
  userDataPerWeek,
  onClickDay,
  onClickWeek,
  onClickWeekDay,
  onClickMonth,
  onClickYear,
  renderWeekNumber,
  renderWeekDay,
  headerLeftContent,
  headerRightContent,
  theme = defaultCalendarTheme,
  extraDayContent,
  defaultHighlights,
}: CalendarMonthProps<T>) {
  const showWeekNumber = theme.WeekNumber.show;

  return (
    <>
      <Box alignItems={"stretch"}>
        <Row
          justifyContent={"space-between"}
          alignItems={"center"}
          height={"32px"}
        >
          <Box alignItems={"center"}>{headerLeftContent}</Box>

          <Row alignItems={"center"}>
            <Row width={"104px"} justifyContent={"center"}>
              {onClickMonth ? (
                <FlatButton
                  onClick={() => onClickMonth(month)}
                  label={month.name}
                />
              ) : (
                <Text>{month.name}</Text>
              )}
            </Row>
            <Space />
            <Row width={"64px"} justifyContent={"center"}>
              {onClickYear ? (
                <FlatButton
                  onClick={() => onClickYear(month.year)}
                  label={String(month.year)}
                />
              ) : (
                <Text>{month.year}</Text>
              )}
            </Row>
          </Row>

          <Box alignItems={"center"}>{headerRightContent}</Box>
        </Row>

        <table>
          <tbody>
            <tr>
              {showWeekNumber && (
                <td>
                  <Box
                    width={theme.width}
                    height={theme.height}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Text
                      size={"small"}
                      color={theme.CalendarMonth.headerTextColor}
                    >
                      W
                    </Text>
                  </Box>
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
              <CalendarWeek<T>
                key={week.weekNumber}
                month={month}
                week={week}
                dayComponent={dayComponent}
                statePerWeekDay={statePerWeek && statePerWeek[week.weekNumber]}
                userDataPerWeekDay={
                  userDataPerWeek && userDataPerWeek[week.weekNumber]
                }
                onClickDay={onClickDay}
                onClickWeek={onClickWeek}
                theme={theme}
                renderWeekNumber={renderWeekNumber}
                extraDayContent={extraDayContent}
                defaultHighlights={defaultHighlights}
              />
            ))}
          </tbody>
        </table>
      </Box>
    </>
  );
}
