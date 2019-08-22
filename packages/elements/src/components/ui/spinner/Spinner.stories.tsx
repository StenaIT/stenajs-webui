import { Column, Space, StandardText } from "@stenajs-webui/core";
import { Spinner } from "@stenajs-webui/elements";
import { color } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Box } from "@stenajs-webui/core";

storiesOf("elements/Spinner", module)
  .add("standard", () => (
    <Column>
      <StandardText>size=large</StandardText>
      <Spinner size={"large"} />
      <Space num={4} />
      <StandardText>size=normal</StandardText>
      <Spinner size={"normal"} />
      <Space num={4} />
      <StandardText>size=small</StandardText>
      <Spinner size={"small"} />
      <Space num={4} />
      <StandardText>size=tiny</StandardText>
      <Spinner size={"tiny"} />
      <Space num={4} />
    </Column>
  ))
  .add("inverted", () => (
    <Box indent={4} spacing={4} background={"#777777"} display={"inline-block"}>
      <Spinner inverted />
    </Box>
  ))
  .add("with custom color", () => <Spinner color={color("Color", "red")} />);
