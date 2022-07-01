import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { useState } from "react";
import markdown from "./NumericTextInput.md?raw";
import {
  NumericInputValueProps,
  useNumericInputValue,
} from "./hooks/UseNumericInputValue";
import { NumericTextInput, NumericTextInputProps } from "./NumericTextInput";
import { Story } from "@storybook/react";
import { disabledControl } from "../../../storybook-helpers/storybook-controls";

export default {
  title: "forms/TextInput/NumericTextInput",
  parameters: { notes: { markdown } },
  component: NumericTextInput,
  argTypes: {
    inputRef: disabledControl,
    contentLeft: disabledControl,
    contentRight: disabledControl,
    wrapperStyle: disabledControl,
    wrapperClassName: disabledControl,
    iconLeft: disabledControl,
    iconRight: disabledControl,
  },
};

const NumericInput: React.FC<NumericInputValueProps> = ({
  value,
  onValueChange,
}) => {
  const numericProps = useNumericInputValue(value, onValueChange);
  return <NumericTextInput {...numericProps} />;
};

export const Demo: Story<NumericTextInputProps> = (props) => {
  const [value, setValue] = useState("5");
  return (
    <div style={{ display: "inline-block" }}>
      <NumericTextInput {...props} value={value} onValueChange={setValue} />
      <Text>String value: {value}</Text>
    </div>
  );
};

export const WithNumberDataType = () => {
  const [value, setValue] = useState<number | undefined>(5);
  return (
    <div style={{ display: "inline-block" }}>
      <NumericInput value={value} onValueChange={setValue} />
      <Text>Number value: {value}</Text>
    </div>
  );
};

export const Disabled = () => {
  const [value, setValue] = useState("5");
  return (
    <div style={{ display: "inline-block" }}>
      <NumericTextInput disabled value={value} onValueChange={setValue} />
    </div>
  );
};

export const HiddenButtons = () => {
  const [value, setValue] = useState("5");
  return (
    <div style={{ display: "inline-block" }}>
      <NumericTextInput hideButtons value={value} onValueChange={setValue} />
    </div>
  );
};

export const WithLeftIcon = () => {
  const [value, setValue] = useState("5");
  return (
    <div style={{ display: "inline-block" }}>
      <NumericTextInput
        iconLeft={faCoffee}
        value={value}
        min={1}
        max={8}
        onValueChange={setValue}
      />
    </div>
  );
};

export const WithContentRight = () => {
  const [value, setValue] = useState("5");
  return (
    <div style={{ display: "inline-block" }}>
      <NumericTextInput
        value={value}
        min={1}
        max={8}
        contentRight={
          <div style={{ color: "grey" }}>
            <Text>sec</Text>
          </div>
        }
        onValueChange={setValue}
      />
    </div>
  );
};

export const WithMinAndMax = () => {
  const [value, setValue] = useState("5");
  return (
    <div style={{ display: "inline-block" }}>
      <Text>Minimum 3, maximum 8</Text>
      <Space />
      <NumericTextInput
        min={3}
        max={8}
        value={value}
        onValueChange={setValue}
      />
    </div>
  );
};
