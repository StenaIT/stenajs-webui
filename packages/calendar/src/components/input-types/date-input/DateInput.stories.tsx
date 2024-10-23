import { Column } from "@stenajs-webui/core";
import { addDays, addMonths, addYears, format } from "date-fns";
import * as React from "react";
import { useState } from "react";
import { setDayStateValue } from "../../../util/calendar/StateModifier";
import { DateInput } from "./DateInput";
import { StoryFn } from "@storybook/react";

export default {
  title: "calendar/Input/DateInput",
  component: DateInput,
  decorators: [
    (TheStory: StoryFn) => (
      <div style={{ marginBottom: "400px" }}>
        <TheStory />
      </div>
    ),
  ],
};

const disabledTomorrow = setDayStateValue(undefined, addDays(new Date(), 1), {
  highlights: ["disabled"],
});

export const Standard = () => {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return (
    <div style={{ display: "inline-block" }}>
      <DateInput value={value} onChange={setValue} />
    </div>
  );
};

export const Centered = () => (
  <Column alignItems={"center"} justifyContent={"center"} height={"800px"}>
    <Standard />
  </Column>
);

export const Disabled = () => {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return (
    <div style={{ display: "inline-block" }}>
      <DateInput value={value} onChange={setValue} disabled />
    </div>
  );
};

export const WithDisabledDateTomorrow = () => {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return (
    <div style={{ display: "inline-block" }}>
      <DateInput
        value={value}
        onChange={setValue}
        calendarProps={{ statePerMonth: disabledTomorrow }}
      />
    </div>
  );
};

export const Empty = () => (
  <div style={{ display: "inline-block" }}>
    <DateInput value={undefined} />
  </div>
);

export const UsingPortal = () => {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return (
    <div style={{ display: "inline-block" }}>
      <DateInput
        value={value}
        onChange={setValue}
        portalTarget={document.body}
      />
    </div>
  );
};

export const CustomDateFormat = () => (
  <div style={{ display: "inline-block" }}>
    <DateInput value={new Date()} displayFormat={"dd/MM/yyyy"} />
  </div>
);

export const WithPreselectedValue = () => (
  <div style={{ display: "inline-block" }}>
    <DateInput value={addMonths(new Date(), 2)} />
  </div>
);

export const WithVariant = () => (
  <div style={{ display: "inline-block" }}>
    <DateInput value={addMonths(new Date(), 2)} variant={"error"} />
  </div>
);

export const MinMaxDates = () => {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return (
    <div style={{ display: "inline-block" }}>
      <DateInput
        value={value}
        onChange={setValue}
        minDate={format(addDays(new Date(), 3), "yyyy-MM-dd")}
        maxDate={format(addYears(addDays(new Date(), 5), 1), "yyyy-MM-dd")}
      />
    </div>
  );
};

export const MinMaxDatesClose = () => {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return (
    <div style={{ display: "inline-block" }}>
      <DateInput
        value={value}
        onChange={setValue}
        minDate={format(addDays(new Date(), 3), "yyyy-MM-dd")}
        maxDate={format(addDays(new Date(), 5), "yyyy-MM-dd")}
      />
    </div>
  );
};
