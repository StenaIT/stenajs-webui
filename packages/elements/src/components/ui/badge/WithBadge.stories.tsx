import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { Icon, WithBadge } from "@stenajs-webui/elements";
import { color, number } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("elements/Badge/WithBadge", module)
  .add("icon with badge", () => (
    <WithBadge label={5}>
      <Icon icon={faFire} />
    </WithBadge>
  ))
  .add("with knobs", () => (
    <WithBadge
      label={number("Label", 5)}
      color={color("Color", "red")}
      textColor={color("Text color", "white")}
    >
      <Icon icon={faFire} />
    </WithBadge>
  ));
