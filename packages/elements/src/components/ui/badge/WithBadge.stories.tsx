import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import * as React from "react";
import { Icon } from "../icon/Icon";
import { WithBadge, WithBadgeProps } from "./WithBadge";
import { Story } from "@storybook/react";

export default {
  title: "elements/Badge/WithBadge",
  component: WithBadge,
  args: {
    label: 5,
    variant: "info",
  },
};

export const IconWithBadge: Story<WithBadgeProps> = (props) => (
  <WithBadge {...props}>
    <Icon icon={faFire} />
  </WithBadge>
);
