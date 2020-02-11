import { color, number } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Badge } from "@stenajs-webui/elements";

storiesOf("elements/Badge/Badge", module)
  .add("standard", () => <Badge label={5} />)
  .add("with knobs", () => (
    <Badge
      label={number("Label", 5)}
      background={color("Background", "red")}
      textColor={color("Text color", "white")}
    />
  ));
