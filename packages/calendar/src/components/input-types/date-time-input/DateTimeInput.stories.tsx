import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { Indent, Row } from "@stenajs-webui/core";
import { FlatButton } from "@stenajs-webui/elements";
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
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Row>
      <DateTimeInput value={value} onValueChange={setValue} />
      <Indent />
      <FlatButton leftIcon={faTrash} onClick={() => setValue(null)} />
    </Row>
  );
};

export const PreselectedValue = () => {
  const [value, setValue] = useState<Date | null>(new Date());

  return <DateTimeInput value={value} onValueChange={setValue} />;
};
