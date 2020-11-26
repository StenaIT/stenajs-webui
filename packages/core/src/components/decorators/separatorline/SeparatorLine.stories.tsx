import * as React from "react";
import { SeparatorLine, SeparatorLineProps } from "./SeparatorLine";
import { Story } from "@storybook/react";
import {
  colorListControl,
  widthControl,
} from "../../../storybook-helpers/storybook-controls";

export default {
  title: "core/Decorators/SeparatorLine",
  component: SeparatorLine,
  argTypes: {
    color: colorListControl,
    width: widthControl,
  },
  args: {
    width: 1,
  },
};

export const Overview: Story<SeparatorLineProps> = ({ width, ...props }) => (
  <SeparatorLine width={`${width}px`} {...props} />
);

export const Vertical = () => <SeparatorLine vertical size={"250px"} />;
