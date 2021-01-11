import { addDays, subDays } from "date-fns";
import * as React from "react";
import { useState } from "react";
import { DateRangeCalendarOnChangeValue } from "../../calendar-types/date-range-calendar/DateRangeCalendar";
import { DateRangeInput } from "./DateRangeInput";
import { Story } from "@storybook/react";

export default {
  title: "calendar/Input/DateRangeInput",
  component: DateRangeInput,
  decorators: [
    (TheStory: Story) => (
      <div style={{ marginBottom: "400px" }}>
        <TheStory />
      </div>
    ),
  ],
};

export const Standard = () => {
  const [value, setValue] = useState<DateRangeCalendarOnChangeValue>({
    startDate: undefined,
    endDate: undefined,
  });

  return (
    <div style={{ display: "inline-block" }}>
      <DateRangeInput value={value} onChange={setValue} />
    </div>
  );
};

export const Empty = () => (
  <div style={{ display: "inline-block" }}>
    <DateRangeInput onChange={() => {}} value={{}} />
  </div>
);

export const UsingPortal = () => {
  const [value, setValue] = useState<DateRangeCalendarOnChangeValue>({
    startDate: undefined,
    endDate: undefined,
  });

  return (
    <div style={{ display: "inline-block" }}>
      <DateRangeInput
        value={value}
        onChange={setValue}
        portalTarget={document.body}
      />
    </div>
  );
};

export const WithPreselectedValue = () => {
  const [value, setValue] = useState<DateRangeCalendarOnChangeValue>({
    startDate: new Date(),
    endDate: addDays(new Date(), 5),
  });

  return (
    <div style={{ display: "inline-block" }}>
      <DateRangeInput value={value} onChange={setValue} />
    </div>
  );
};

export const WithTodayHighlighted = () => {
  const [value, setValue] = useState<DateRangeCalendarOnChangeValue>({
    startDate: undefined,
    endDate: undefined,
  });

  return (
    <div style={{ display: "inline-block" }}>
      <DateRangeInput
        value={value}
        onChange={setValue}
        calendarProps={{ highlightToday: true }}
      />
    </div>
  );
};

export const WithInvalidRange = () => (
  <div style={{ display: "inline-block" }}>
    <DateRangeInput
      value={{ startDate: new Date(), endDate: subDays(new Date(), 7) }}
      onChange={() => {}}
    />
  </div>
);
