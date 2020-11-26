import * as React from "react";
import { SwitchWithLabel, SwitchWithLabelProps } from "./SwitchWithLabel";
import { Story } from "@storybook/react";

export default {
  title: "forms/Switch/SwitchWithLabel",
  component: SwitchWithLabel,
  args: {
    label: "Enable something",
  },
};

export const Demo: Story<SwitchWithLabelProps> = (props) => (
  <SwitchWithLabel {...props} />
);
