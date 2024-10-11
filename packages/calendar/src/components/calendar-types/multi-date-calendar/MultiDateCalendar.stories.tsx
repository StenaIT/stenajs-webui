import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Row, Space } from "@stenajs-webui/core";
import { addDays, getISOWeek } from "date-fns";
import * as React from "react";
import { useState } from "react";
import { OnClickWeek, RenderWeekNumber } from "../../../types/CalendarTypes";
import { setDayStateValue } from "../../../util/calendar/StateModifier";
import { MultiDateCalendar } from "./MultiDateCalendar";
import { WeekData } from "../../../util/calendar/CalendarDataFactory";
import {
  CalendarTheme,
  extranetCalendarTheme,
} from "../../calendar/CalendarTheme";
import { WeekNumberCell } from "../../calendar/renderers/WeekNumberCell";
import { useDateRangeCalendarState } from "../date-range-calendar/hooks/UseDateRangeCalendarState";

export default {
  title: "calendar/Calendar/MultiDateCalendar",
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
    },
  );
}
for (let i = 10; i < 14; i++) {
  statePerMonthWithTwoWeeksEnabled = setDayStateValue(
    statePerMonthWithTwoWeeksEnabled,
    addDays(new Date(), i),
    {
      highlights: ["enabled"],
    },
  );
}

export const Standard = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();
  return <MultiDateCalendar {...props} onChange={setValue} value={value} />;
};

export const TodayHighlighted = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();
  return (
    <MultiDateCalendar
      highlightToday
      onChange={setValue}
      value={value}
      {...props}
    />
  );
};

export const WithDisabledDateTomorrow = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();

  return (
    <MultiDateCalendar
      onChange={setValue}
      value={value}
      statePerMonth={disabledTomorrow}
      {...props}
    />
  );
};

export const WithDisabledAsDefault = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();

  return (
    <MultiDateCalendar
      defaultHighlights={["disabled"]}
      onChange={setValue}
      value={value}
      statePerMonth={statePerMonthWithTwoWeeksEnabled}
      {...props}
    />
  );
};

export const WithMonthSwitcherBelow = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();

  return (
    <MultiDateCalendar
      onChange={setValue}
      value={value}
      monthSwitcherPlacement={"below"}
      {...props}
    />
  );
};

export const WithMultipleMonths = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();

  return (
    <MultiDateCalendar
      onChange={setValue}
      numMonths={3}
      value={value}
      {...props}
    />
  );
};

export const WithMultipleRows = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();
  return (
    <MultiDateCalendar
      onChange={setValue}
      numMonths={6}
      monthsPerRow={3}
      value={value}
      {...props}
    />
  );
};

export const WithCustomWeekContent = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();

  const renderWeekNumber: RenderWeekNumber = (
    week: WeekData,
    theme: CalendarTheme,
    onClick?: OnClickWeek,
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
    <MultiDateCalendar
      onChange={setValue}
      value={value}
      renderWeekNumber={renderWeekNumber}
      {...props}
    />
  );
};

export const WithCustomContent = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();

  return (
    <MultiDateCalendar
      onChange={setValue}
      value={value}
      extraDayContent={() => (
        <Box position={"absolute"} top={"-10px"} right={"-10px"}>
          <FontAwesomeIcon icon={faCoffee} />
        </Box>
      )}
      {...props}
    />
  );
};

export const WithInstanceCustomTheme = () => {
  const [value, setValue] = useState<Array<Date>>([]);
  const props = useDateRangeCalendarState();

  return (
    <Row>
      <MultiDateCalendar
        onChange={setValue}
        value={value}
        theme={extranetCalendarTheme}
        {...props}
      />
      <Space num={2} />
      <MultiDateCalendar onChange={setValue} value={value} {...props} />
    </Row>
  );
};
