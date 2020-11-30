import * as React from "react";
import { useState } from "react";
import { CheckboxWithLabel, CheckboxWithLabelProps } from "./CheckboxWithLabel";
import { Story } from "@storybook/react";
import {
  colorListControl,
  disabledControl,
} from "../../../storybook-helpers/storybook-controls";
import { Column, Space } from "@stenajs-webui/core";

export default {
  title: "forms/Checkbox/CheckboxWithLabel",
  component: CheckboxWithLabel,
  argTypes: {
    inputRef: disabledControl,
    textColor: colorListControl,
  },
  args: {
    label: "Add cake",
  },
};

export const Demo: Story<CheckboxWithLabelProps> = (props) => (
  <CheckboxWithLabel {...props} />
);

export const Standard = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Column>
      <CheckboxWithLabel
        label={"Add cake"}
        value={checked}
        onValueChange={setChecked}
      />
      <Space />
      <CheckboxWithLabel label={"Add cake"} />
      <Space />
      <CheckboxWithLabel label={"Add cake"} indeterminate />
    </Column>
  );
};

export const Disabled = () => (
  <Column>
    <CheckboxWithLabel label={"Add cake"} value={false} disabled />
    <Space />
    <CheckboxWithLabel label={"Add cake"} value={true} disabled />
    <Space />
    <CheckboxWithLabel label={"Add cake"} indeterminate disabled />
  </Column>
);
