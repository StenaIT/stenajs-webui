import { Story } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { TravelDateInput } from "./TravelDateInput";
import { Row } from "@stenajs-webui/core";
import { LabelledTextInput } from "@stenajs-webui/forms";

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
  const [value, setValue] = useState<Date | undefined>(undefined);

  return (
    <div style={{ display: "inline-block" }}>
      <TravelDateInput />
      <Row>
        <LabelledTextInput borderRadiusVariant={""} />
      </Row>
    </div>
  );
};
