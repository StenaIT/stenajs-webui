import { boolean, color, number } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Badge } from "@stenajs-webui/elements";

storiesOf("elements/Badge/Badge", module)
  .add("standard", () => <Badge label={5} />)
  .add("with knobs", () => {
    const overrideSize = boolean("Override size", false);
    const size =
      number("Size", 18, { range: true, min: 10, max: 25, step: 1 }) + "px";
    return (
      <Badge
        label={number("Label", 5)}
        color={color("Color", "red")}
        textColor={color("Text color", "white")}
        size={overrideSize ? size : undefined}
      />
    );
  });
