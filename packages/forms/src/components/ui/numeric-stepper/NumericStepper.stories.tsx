import { Space, Txt } from "@stenajs-webui/core";
import * as React from "react";
import { useState } from "react";
import {
  NumericInputValueProps,
  useNumericInputValue,
} from "../numeric-text-input/hooks/UseNumericInputValue";
import { NumericStepper, NumericStepperProps } from "./NumericStepper";
import { Story } from "@storybook/react";
import { disabledControl } from "../../../storybook-helpers/storybook-controls";

export default {
  title: "forms/TextInput/NumericStepper",
  component: NumericStepper,
  argTypes: {
    step: { control: { type: "number" } },
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
    disabled: { control: { type: "boolean" } },
    contentRight: disabledControl,
  },
};

const NumericInput: React.FC<NumericInputValueProps> = ({
  value,
  onValueChange,
}) => {
  const numericProps = useNumericInputValue(value, onValueChange);
  return <NumericStepper {...numericProps} />;
};

export const Demo: Story<NumericStepperProps> = (props) => {
  const [value, setValue] = useState("5");
  return (
    <div style={{ display: "inline-block" }}>
      <NumericStepper {...props} value={value} onValueChange={setValue} />
      <Txt>String value: {value}</Txt>
    </div>
  );
};

export const WithNumberDataType = () => {
  const [value, setValue] = useState<number | undefined>(5);
  return (
    <div style={{ display: "inline-block" }}>
      <NumericInput value={value} onValueChange={setValue} />
      <Txt>Number value: {value}</Txt>
    </div>
  );
};

export const Disabled = () => {
  const [value, setValue] = useState("5");
  return (
    <div style={{ display: "inline-block" }}>
      <NumericStepper disabled value={value} onValueChange={setValue} />
    </div>
  );
};

export const WithMinAndMax = () => {
  const [value, setValue] = useState("5");
  return (
    <div style={{ display: "inline-block" }}>
      <Txt>Minimum 3, maximum 8</Txt>
      <Space />
      <NumericStepper min={3} max={8} value={value} onValueChange={setValue} />
    </div>
  );
};

export const WithContentRight = () => {
  const [value, setValue] = useState("5");
  return (
    <div style={{ display: "inline-block" }}>
      <NumericStepper
        value={value}
        min={1}
        max={8}
        contentRight={
          <Txt color={"gray"} userSelect={"none"}>
            sec
          </Txt>
        }
        onValueChange={setValue}
      />
    </div>
  );
};
