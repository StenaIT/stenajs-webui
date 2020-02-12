import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { Icon, WithBadge } from "@stenajs-webui/elements";
import { select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("elements/Badge/WithBadge", module).add("icon with badge", () => (
  <WithBadge
    label={5}
    type={select("Type", ["notification", "warning", "error"], "notification")}
  >
    <Icon icon={faFire} />
  </WithBadge>
));
