import { storiesOf } from "@storybook/react";
import { addDays } from "date-fns";
import * as React from "react";
import { DateRangeCalendarWithState } from "./DateRangeCalendar";
import { setDayStateValue } from "./util/StateModifier";

let statePerMonthWithTwoWeeksEnabled = {};
for (let i = 1; i < 7; i++) {
  statePerMonthWithTwoWeeksEnabled = setDayStateValue(
    statePerMonthWithTwoWeeksEnabled,
    addDays(new Date(), i),
    {
      highlights: ["enabled"]
    }
  );
}
for (let i = 10; i < 14; i++) {
  statePerMonthWithTwoWeeksEnabled = setDayStateValue(
    statePerMonthWithTwoWeeksEnabled,
    addDays(new Date(), i),
    {
      highlights: ["enabled"]
    }
  );
}

// tslint:disable-next-line
const noop = () => {};

storiesOf("calendar/Calendar/DateRangeCalendarWithState", module)
  .add("standard", () => <DateRangeCalendarWithState onChange={noop} />)
  .add("with today highlighted", () => (
    <DateRangeCalendarWithState onChange={noop} highlightToday />
  ))
  .add("with default highlights", () => (
    <DateRangeCalendarWithState
      onChange={noop}
      defaultHighlights={["disabled"]}
      statePerMonth={statePerMonthWithTwoWeeksEnabled}
    />
  ))
  .add("with multiple months", () => (
    <DateRangeCalendarWithState onChange={noop} numMonths={3} />
  ))
  .add("with multiple rows", () => (
    <DateRangeCalendarWithState
      onChange={noop}
      numMonths={6}
      monthsPerRow={3}
    />
  ));
