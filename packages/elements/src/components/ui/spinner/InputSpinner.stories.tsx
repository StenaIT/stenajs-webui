import { Column, Space, StandardText } from "@stenajs-webui/core";
import { InputSpinner } from "@stenajs-webui/elements";
import { color } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("elements/InputSpinner", module)
  .add("standard", () => (
    <Column>
      <StandardText>Large</StandardText>
      <InputSpinner size={"large"} />
      <Space num={4} />
      <StandardText>Normal</StandardText>
      <InputSpinner size={"normal"} />
      <Space num={4} />
      <StandardText>Small</StandardText>
      <InputSpinner size={"small"} />
      <Space num={4} />
    </Column>
  ))
  .add("with custom color", () => (
    <InputSpinner color={color("trackColor", "red")} />
  ));
