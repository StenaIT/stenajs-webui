import { addDays, addMonths } from "date-fns";
import * as React from "react";
import { useState } from "react";
import { setDayStateValue } from "../../../util/calendar/StateModifier";
import { DateInput } from "./DateInput";
import { Story } from "@storybook/react";

export default {
  title: "calendar/Input/DateInput",
  component: DateInput,
  decorators: [
    (TheStory: Story) => (
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
