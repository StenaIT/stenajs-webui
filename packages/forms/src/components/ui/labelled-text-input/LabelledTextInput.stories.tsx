import * as React from "react";
import { Story } from "@storybook/react";
import { LabelledTextInput, LabelledTextInputProps } from "./LabelledTextInput";
import { useState } from "react";
import { Column, Heading } from "@stenajs-webui/core";

export default {
  title: "forms/TextInput/LabelledTextInput",
  component: LabelledTextInput,
};

const ExampleItem: React.FC<LabelledTextInputProps> = (props) => {
  const [text, setText] = useState<string>("");
  return (
    <LabelledTextInput
      label={props.label ?? "Input field"}
      value={text}
      onValueChange={setText}
      placeholder={props.placeholder ?? "Input field"}
      {...props}
    />
  );
};
const Example = () => (
  <Column gap={2}>
    <Heading>Medium</Heading>
    <ExampleItem size={"medium"} id={"testmedium"} />
    <Heading>Large</Heading>
    <ExampleItem size={"large"} id={"testlarge"} />
    <Heading>Error</Heading>
    <ExampleItem variant={"error"} id={"testlarge"} />
  </Column>
);

export const Desktop: Story<LabelledTextInputProps> = (props) => (
  <Example {...props} />
);

export const Mobile: Story<LabelledTextInputProps> = (props) => (
  <Example {...props} />
);

Mobile.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};
