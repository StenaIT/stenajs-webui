import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Row, Space, Text } from "@stenajs-webui/core";
import { addDays, getISOWeek } from "date-fns";
import * as React from "react";
import { useState } from "react";
import { OnClickWeek, RenderWeekNumber } from "../../../types/CalendarTypes";
import { setDayStateValue } from "../../../util/calendar/StateModifier";
import { DateRangeExclusionCalendar } from "./DateRangeExclusionCalendar";
import { WeekData } from "../../../util/calendar/CalendarDataFactory";
import {
  CalendarTheme,
  extranetCalendarTheme,
} from "../../calendar/CalendarTheme";
import { WeekNumberCell } from "../../calendar/renderers/WeekNumberCell";
import { useDateRangeCalendarState } from "../date-range-calendar/hooks/UseDateRangeCalendarState";

export default {
  title: "calendar/Calendar/DateRangeExclusionCalendar",
  component: DateRangeExclusionCalendar,
};

const disabledTomorrow = setDayStateValue(undefined, addDays(new Date(), 1), {
  highlights: ["disabled"],
});

let statePerMonthWithTwoWeeksEnabled = {};
for (let i = 1; i < 7; i++) {
  statePerMonthWithTwoWeeksEnabled = setDayStateValue(
    statePerMonthWithTwoWeeksEnabled,
    addDays(new Date(), i),
    {
      highlights: ["enabled"],
    }
  );
}
for (let i = 10; i < 14; i++) {
  statePerMonthWithTwoWeeksEnabled = setDayStateValue(
    statePerMonthWithTwoWeeksEnabled,
    addDays(new Date(), i),
    {
      highlights: ["enabled"],
    }
  );
}

export const Standard = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();
  return (
    <>
      <DateRangeExclusionCalendar
        onChange={setValue}
        value={value}
        {...props}
      />
      <Space />
      <Box background={"#eee"} spacing={2} indent={2}>
        <Text>Click to select date range.</Text>
        <Space />
        <Text>Hold ctrl (or cmd) and click to toggle individual dates.</Text>
      </Box>
    </>
  );
};

export const TodayHighlighted = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();
  return (
    <DateRangeExclusionCalendar
      {...props}
      highlightToday
      onChange={setValue}
      value={value}
    />
  );
};

export const WithDisabledDateTomorrow = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();
  return (
    <DateRangeExclusionCalendar
      {...props}
      onChange={setValue}
      value={value}
      statePerMonth={disabledTomorrow}
    />
  );
};

export const WithDisabledAsDefault = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();
  return (
    <DateRangeExclusionCalendar
      {...props}
      defaultHighlights={["disabled"]}
      onChange={setValue}
      value={value}
      statePerMonth={statePerMonthWithTwoWeeksEnabled}
    />
  );
};

export const WithMonthSwitcherBelow = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();
  return (
    <DateRangeExclusionCalendar
      {...props}
      onChange={setValue}
      value={value}
      monthSwitcherPlacement={"below"}
    />
  );
};

export const WithMultipleMonths = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();
  return (
    <DateRangeExclusionCalendar
      {...props}
      onChange={setValue}
      numMonths={3}
      value={value}
    />
  );
};

export const WithMultipleRows = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();
  return (
    <DateRangeExclusionCalendar
      {...props}
      onChange={setValue}
      numMonths={6}
      monthsPerRow={3}
      value={value}
    />
  );
};

export const WithCustomWeekContent = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();
  const renderWeekNumber: RenderWeekNumber = (
    week: WeekData,
    theme: CalendarTheme,
    onClick?: OnClickWeek
  ) => {
    const now = new Date();
    return (
      <WeekNumberCell
        week={week}
        onClickWeek={onClick}
        theme={theme}
        background={
          week.startYear === now.getFullYear() &&
          week.weekNumber === getISOWeek(now) ? (
            <FontAwesomeIcon
              icon={faCoffee}
              color={"blue"}
              style={{ fontSize: 30 }}
            />
          ) : undefined
        }
      />
    );
  };

  return (
    <DateRangeExclusionCalendar
      {...props}
      onChange={setValue}
      value={value}
      renderWeekNumber={renderWeekNumber}
    />
  );
};

export const WithCustomContent = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();
  return (
    <DateRangeExclusionCalendar
      {...props}
      onChange={setValue}
      value={value}
      extraDayContent={() => (
        <Box position={"absolute"} top={"-10px"} right={"-10px"}>
          <FontAwesomeIcon icon={faCoffee} />
        </Box>
      )}
    />
  );
};

export const WithInstanceCustomTheme = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();
  return (
    <Row>
      <DateRangeExclusionCalendar
        {...props}
        onChange={setValue}
        value={value}
        theme={extranetCalendarTheme}
      />
      <Space num={2} />
      <DateRangeExclusionCalendar
        onChange={setValue}
        value={value}
        {...props}
      />
    </Row>
  );
};
