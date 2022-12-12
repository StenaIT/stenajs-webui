import { addDays, format } from "date-fns";
import { sv, enUS } from "date-fns/locale";
import * as React from "react";
import { setDayStateValue } from "../../../util/calendar/StateModifier";
import { DateRangeCalendar, DateRangeCalendarProps } from "./DateRangeCalendar";
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
  onValueChange,
}: Pick<DateRangeCalendarProps<T>, "onValueChange">) {
  const calendarProps = useDateRangeCalendarState();
  return <DateRangeCalendar {...calendarProps} onValueChange={onValueChange} />;
}

export const Standard = () => {
  const props = useDateRangeCalendarState();
  return <DateRangeCalendar {...props} />;
};

export const SwedishLocale = () => {
  const props = useDateRangeCalendarState();
  return <DateRangeCalendar {...props} locale={sv} />;
};

export const WeekStartAtSunday = () => {
  const props = useDateRangeCalendarState();
  return <DateRangeCalendar {...props} locale={enUS} />;
};

export const WithStateHook = () => <DateRangeCalendarWithState />;

export const WithTodayHighlighted = () => {
  const props = useDateRangeCalendarState();
  return <DateRangeCalendar highlightToday {...props} />;
};

export const WithMinMaxDate = () => {
  const props = useDateRangeCalendarState();
  return (
    <DateRangeCalendar
      {...props}
      minDate={format(addDays(new Date(), 3), "yyyy-MM-dd")}
      maxDate={format(addDays(new Date(), 5), "yyyy-MM-dd")}
    />
  );
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

export const WithHiddenYearPagination = () => {
  const props = useDateRangeCalendarState();
  return <DateRangeCalendar {...props} hideYearPagination={true} />;
};
