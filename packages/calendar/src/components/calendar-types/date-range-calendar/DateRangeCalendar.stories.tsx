import { addDays, format } from "date-fns";
import { enUS, sv } from "date-fns/locale";
import * as React from "react";
import { useState } from "react";
import { DateRange } from "../../../types/DateRange";
import { setDayStateValue } from "../../../util/calendar/StateModifier";
import { DateRangeCalendar } from "./DateRangeCalendar";
import markdown from "./DateRangeCalendar.md?raw";
import { useDateRangeCalendarState } from "./hooks/UseDateRangeCalendarState";

export default {
  title: "calendar/Calendar/DateRangeCalendar",
  component: DateRangeCalendar,
  parameters: {
    notes: { markdown },
  },
};

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
  const props = useDateRangeCalendarState();
  const [dateRange, setDateRange] = useState<DateRange>();
  return (
    <DateRangeCalendar
      {...props}
      value={dateRange}
      onValueChange={setDateRange}
    />
  );
};

export const SwedishLocale = () => {
  const props = useDateRangeCalendarState();
  const [dateRange, setDateRange] = useState<DateRange>();
  return (
    <DateRangeCalendar
      value={dateRange}
      onValueChange={setDateRange}
      {...props}
      locale={sv}
    />
  );
};

export const WeekStartAtSunday = () => {
  const props = useDateRangeCalendarState();
  const [dateRange, setDateRange] = useState<DateRange>();
  return (
    <DateRangeCalendar
      value={dateRange}
      onValueChange={setDateRange}
      {...props}
      locale={enUS}
    />
  );
};

export const ShowWeekNumbers = () => {
  const props = useDateRangeCalendarState();
  const [dateRange, setDateRange] = useState<DateRange>();
  return (
    <DateRangeCalendar
      value={dateRange}
      onValueChange={setDateRange}
      {...props}
      locale={sv}
      showWeekNumber
    />
  );
};

export const WithTodayHighlighted = () => {
  const props = useDateRangeCalendarState();
  const [dateRange, setDateRange] = useState<DateRange>();
  return (
    <DateRangeCalendar
      value={dateRange}
      onValueChange={setDateRange}
      highlightToday
      {...props}
    />
  );
};

export const WithMinMaxDate = () => {
  const props = useDateRangeCalendarState();
  const [dateRange, setDateRange] = useState<DateRange>();
  return (
    <DateRangeCalendar
      value={dateRange}
      onValueChange={setDateRange}
      {...props}
      minDate={format(addDays(new Date(), 3), "yyyy-MM-dd")}
      maxDate={format(addDays(new Date(), 5), "yyyy-MM-dd")}
    />
  );
};

export const WithDefaultHighlights = () => {
  const props = useDateRangeCalendarState();
  const [dateRange, setDateRange] = useState<DateRange>();
  return (
    <DateRangeCalendar
      value={dateRange}
      onValueChange={setDateRange}
      {...props}
      defaultHighlights={["disabled"]}
      statePerMonth={statePerMonthWithTwoWeeksEnabled}
    />
  );
};

export const WithMultipleMonths = () => {
  const props = useDateRangeCalendarState();
  const [dateRange, setDateRange] = useState<DateRange>();
  return (
    <DateRangeCalendar
      value={dateRange}
      onValueChange={setDateRange}
      {...props}
      numMonths={3}
    />
  );
};

export const WithMultipleRows = () => {
  const props = useDateRangeCalendarState();
  const [dateRange, setDateRange] = useState<DateRange>();
  return (
    <DateRangeCalendar
      value={dateRange}
      onValueChange={setDateRange}
      {...props}
      numMonths={6}
      monthsPerRow={3}
    />
  );
};
