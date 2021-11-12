import { Column } from "@stenajs-webui/core";
import { Story } from "@storybook/react";
import { addDays } from "date-fns";
import * as React from "react";
import { useState } from "react";
import { DateRangeOnChangeValue } from "../../../features/date-range/hooks/UseDateRangeOnClickDayHandler";
import { useDateRangeCalendarState } from "../../calendar-types/date-range-calendar/hooks/UseDateRangeCalendarState";
import { DateRangeDualTextInput } from "./DateRangeDualTextInput";

export default {
  title: "calendar/Input/DateRangeDualTextInput",
  component: DateRangeDualTextInput,
  decorators: [
    (TheStory: Story) => (
      <div style={{ marginBottom: "400px" }}>
        <TheStory />
      </div>
    ),
  ],
};

export const Standard = () => {
  const [value, setValue] = useState<DateRangeOnChangeValue | undefined>(
    undefined
  );
  const props = useDateRangeCalendarState();

  return (
    <div style={{ display: "inline-block" }}>
      <DateRangeDualTextInput
        value={value}
        onValueChange={setValue}
        {...props}
      />
    </div>
  );
};

export const DisabledYearPagination = () => {
  const [value, setValue] = useState<DateRangeOnChangeValue | undefined>(
    undefined
  );
  const props = useDateRangeCalendarState();

  return (
    <div style={{ display: "inline-block" }}>
      <DateRangeDualTextInput
        value={value}
        onValueChange={setValue}
        calendarProps={{
          disableYearPagination: true,
        }}
        {...props}
      />
    </div>
  );
};

export const Centered = () => (
  <Column alignItems={"center"} justifyContent={"center"} height={"800px"}>
    <Standard />
  </Column>
);

export const StartSelected = () => {
  const [value, setValue] = useState<DateRangeOnChangeValue | undefined>({
    startDate: new Date(),
  });
  const props = useDateRangeCalendarState();

  return (
    <div style={{ display: "inline-block" }}>
      <DateRangeDualTextInput
        value={value}
        onValueChange={setValue}
        {...props}
      />
    </div>
  );
};

export const EndSelected = () => {
  const [value, setValue] = useState<DateRangeOnChangeValue | undefined>({
    endDate: new Date(),
  });
  const props = useDateRangeCalendarState();

  return (
    <div style={{ display: "inline-block" }}>
      <DateRangeDualTextInput
        value={value}
        onValueChange={setValue}
        {...props}
      />
    </div>
  );
};

export const RangeSelected = () => {
  const [value, setValue] = useState<DateRangeOnChangeValue | undefined>({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
  });
  const props = useDateRangeCalendarState();

  return (
    <div style={{ display: "inline-block" }}>
      <DateRangeDualTextInput
        value={value}
        onValueChange={setValue}
        {...props}
      />
    </div>
  );
};
