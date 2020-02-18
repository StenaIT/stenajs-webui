import { Icon, WithBadge } from "@stenajs-webui/elements";
import { select, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { faFire } from "@fortawesome/pro-light-svg-icons/faFire";

storiesOf("elements/Badge/WithBadge", module).add("icon with badge", () => (
  <WithBadge
    label={text("Label", "5")}
    type={select("Type", ["notification", "warning", "error"], "notification")}
  >
    <Icon icon={faFire} />
  </WithBadge>
));
