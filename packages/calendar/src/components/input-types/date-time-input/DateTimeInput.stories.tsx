import { Story } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { DateTimeInput } from "./DateTimeInput";

export default {
  title: "calendar/Input/DateTimeInput",
  component: DateTimeInput,
  decorators: [
    (TheStory: Story) => (
      <div style={{ marginBottom: "400px", display: "inline-block" }}>
        <TheStory />
      </div>
    ),
  ],
};

export const Standard = () => {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return <DateTimeInput value={value} onValueChange={setValue} />;
};

export const PreselectedValue = () => {
  const [value, setValue] = useState<Date | undefined>(new Date());

  return <DateTimeInput value={value} onValueChange={setValue} />;
};
