import * as React from "react";
import { Badge, BadgeProps } from "./Badge";
import { Story } from "@storybook/react";

export default {
  title: "elements/Badge/Badge",
  component: Badge,
  args: {
    label: 5,
  },
};

export const Standard: Story<BadgeProps> = ({ label = 0, ...props }) => (
  <div style={{ display: "inline-block" }}>
    <Badge label={label} {...props} />
  </div>
);
