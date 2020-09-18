import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { Icon, WithBadge } from "@stenajs-webui/elements";
import { select, text } from "@storybook/addon-knobs";
import * as React from "react";

export default {
  title: "elements/Badge/WithBadge"
};

export const IconWithBadge = () => (
  <WithBadge
    label={text("Label", "5")}
    type={select("Type", ["notification", "warning", "error"], "notification")}
  >
    <Icon icon={faFire} />
  </WithBadge>
);

IconWithBadge.story = {
  name: "icon with badge"
};
