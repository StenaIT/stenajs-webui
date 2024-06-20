import { Story } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { TravelDateInput, TravelDateInputValue } from "./TravelDateInput";

export default {
  title: "calendar/Input/TravelDateInput",
  component: TravelDateInput,
  decorators: [
    (TheStory: Story) => (
      <div style={{ marginBottom: "400px" }}>
        <TheStory />
      </div>
    ),
  ],
};

export const Standard = () => {
  const [value, setValue] = useState<TravelDateInputValue | undefined>(
    undefined
  );

  return (
    <div style={{ display: "inline-block" }}>
      <TravelDateInput value={value} onValueChange={setValue} />
    </div>
  );
};
