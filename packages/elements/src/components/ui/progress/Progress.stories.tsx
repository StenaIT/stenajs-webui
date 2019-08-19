import { Column, Space, StandardText } from "@stenajs-webui/core";
import { Progress } from "@stenajs-webui/elements";
import { color } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("elements/Progress", module)
  .add("standard", () => (
    <Column>
      <StandardText>Large</StandardText>
      <Progress size={"large"} />
      <Space num={4} />
      <StandardText>Normal</StandardText>
      <Progress size={"normal"} />
      <Space num={4} />
      <StandardText>Small</StandardText>
      <Progress size={"small"} />
      <Space num={4} />
    </Column>
  ))
  .add("with custom color", () => (
    <Progress trackColor={color("trackColor", "red")} />
  ));
