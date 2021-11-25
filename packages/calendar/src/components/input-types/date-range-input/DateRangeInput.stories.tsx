import { Column } from "@stenajs-webui/core";
import { Story } from "@storybook/react";
import { addDays, format, subDays } from "date-fns";
import * as React from "react";
import { useState } from "react";
import { DateRangeInput } from "./DateRangeInput";
import { DateRange } from "../../../types/DateRange";

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
  const [value, setValue] = useState<DateRange>({
    startDate: undefined,
    endDate: undefined,
  });

  return (
    <div style={{ display: "inline-block" }}>
      <DateRangeInput value={value} onValueChange={setValue} />
    </div>
  );
};

export const Centered = () => (
  <Column alignItems={"center"} justifyContent={"center"} height={"800px"}>
    <Standard />
  </Column>
);

export const Empty = () => (
  <div style={{ display: "inline-block" }}>
    <DateRangeInput />
  </div>
);

export const UsingPortal = () => {
  const [value, setValue] = useState<DateRange>({
    startDate: undefined,
    endDate: undefined,
  });

  return (
    <div style={{ display: "inline-block" }}>
      <DateRangeInput
        value={value}
        onValueChange={setValue}
        portalTarget={document.body}
      />
    </div>
  );
};

export const WithPreselectedValue = () => {
  const [value, setValue] = useState<DateRange>({
    startDate: new Date(),
    endDate: addDays(new Date(), 5),
  });

  return (
    <div style={{ display: "inline-block" }}>
      <DateRangeInput value={value} onValueChange={setValue} />
    </div>
  );
};

export const WithTodayHighlighted = () => {
  const [value, setValue] = useState<DateRange>({
    startDate: undefined,
    endDate: undefined,
  });

  return (
    <div style={{ display: "inline-block" }}>
      <DateRangeInput
        value={value}
        onValueChange={setValue}
        calendarProps={{ highlightToday: true }}
      />
    </div>
  );
};

export const WithInvalidRange = () => (
  <div style={{ display: "inline-block" }}>
    <DateRangeInput
      value={{ startDate: new Date(), endDate: subDays(new Date(), 7) }}
    />
  </div>
);

export const MinMaxDates = () => {
  const [value, setValue] = useState<DateRange>({
    startDate: undefined,
    endDate: undefined,
  });

  return (
    <div style={{ display: "inline-block" }}>
      <DateRangeInput
        value={value}
        onValueChange={setValue}
        minDate={format(addDays(new Date(), 3), "yyyy-MM-dd")}
        maxDate={format(addDays(new Date(), 15), "yyyy-MM-dd")}
      />
    </div>
  );
};
