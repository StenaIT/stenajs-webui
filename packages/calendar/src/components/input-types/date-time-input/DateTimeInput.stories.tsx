import { Column, Indent, Row } from "@stenajs-webui/core";
import { FlatButton, stenaTrash } from "@stenajs-webui/elements";
import { StoryFn } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { DateTimeInput } from "./DateTimeInput";
import { addDays, format } from "date-fns";

export default {
  title: "calendar/Input/DateTimeInput",
  component: DateTimeInput,
  decorators: [
    (TheStory: StoryFn) => (
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
      <FlatButton leftIcon={stenaTrash} onClick={() => setValue(null)} />
    </Row>
  );
};

export const WithVariant = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Row>
      <DateTimeInput value={value} onValueChange={setValue} variant={"error"} />
      <Indent />
      <FlatButton leftIcon={stenaTrash} onClick={() => setValue(null)} />
    </Row>
  );
};

export const Centered = () => {
  return (
    <Column
      alignItems={"center"}
      justifyContent={"center"}
      height={"800px"}
      width={"800px"}
    >
      <Standard />
    </Column>
  );
};

export const Disabled = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Row>
      <DateTimeInput value={value} onValueChange={setValue} disabled />
      <Indent />
      <FlatButton leftIcon={stenaTrash} onClick={() => setValue(null)} />
    </Row>
  );
};

export const PreselectedValue = () => {
  const [value, setValue] = useState<Date | null>(new Date());

  return <DateTimeInput value={value} onValueChange={setValue} />;
};

export const MinMaxDates = () => {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <DateTimeInput
      value={value}
      onValueChange={setValue}
      minDate={format(addDays(new Date(), 3), "yyyy-MM-dd")}
      maxDate={format(addDays(new Date(), 5), "yyyy-MM-dd")}
    />
  );
};
