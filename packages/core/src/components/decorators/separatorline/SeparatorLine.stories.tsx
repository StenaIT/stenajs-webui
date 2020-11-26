import * as React from "react";
import { SeparatorLine, SeparatorLineProps } from "./SeparatorLine";
import { Story } from "@storybook/react";

export default {
  title: "core/Decorators/SeparatorLine",
  component: SeparatorLine,
  argTypes: {
    color: { control: "color" },
  },
};

export const Overview: Story<SeparatorLineProps> = (props) => (
  <SeparatorLine {...props} />
);

export const Vertical = () => <SeparatorLine vertical size={"250px"} />;
