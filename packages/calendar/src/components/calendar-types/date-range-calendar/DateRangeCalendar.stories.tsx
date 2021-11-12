import { addDays } from "date-fns";
import * as React from "react";
import markdown from "./DateRangeCalendar.md";
import { setDayStateValue } from "../../../util/calendar/StateModifier";
import { DateRangeCalendar, DateRangeCalendarProps } from "./DateRangeCalendar";
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

function DateRangeCalendarWithState<T>({
  onChange,
}: Pick<DateRangeCalendarProps<T>, "onChange">) {
  const calendarProps = useDateRangeCalendarState();
  return <DateRangeCalendar {...calendarProps} onChange={onChange} />;
}

export const Standard = () => {
  const props = useDateRangeCalendarState();
  return <DateRangeCalendar {...props} />;
};

export const WithStateHook = () => <DateRangeCalendarWithState />;

export const WithTodayHighlighted = () => {
  const props = useDateRangeCalendarState();
  return <DateRangeCalendar highlightToday {...props} />;
};

export const WithDefaultHighlights = () => {
  const props = useDateRangeCalendarState();
  return (
    <DateRangeCalendar
      {...props}
      defaultHighlights={["disabled"]}
      statePerMonth={statePerMonthWithTwoWeeksEnabled}
    />
  );
};

export const WithMultipleMonths = () => {
  const props = useDateRangeCalendarState();
  return <DateRangeCalendar {...props} numMonths={3} />;
};

export const WithMultipleRows = () => {
  const props = useDateRangeCalendarState();
  return <DateRangeCalendar {...props} numMonths={6} monthsPerRow={3} />;
};

export const WithDisabledYearPagination = () => {
  const props = useDateRangeCalendarState();
  return <DateRangeCalendar {...props} disableYearPagination={true} />;
};
