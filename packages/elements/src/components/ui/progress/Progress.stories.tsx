import { Progress } from "@stenajs-webui/elements";
import { color, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("elements/Progress", module)
  .add("standard", () => (
    <Progress size={select("Size", ["large", "normal", "small"], "normal")} />
  ))
  .add("with custom color", () => (
    <Progress trackColor={color("trackColor", "red")} />
  ));
