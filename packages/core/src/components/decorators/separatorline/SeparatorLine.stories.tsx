import { defaultTheme, SeparatorLine } from "@stenajs-webui/core";
import { color, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("core/Decorators/SeparatorLine", module)
  .add("standard", () => <SeparatorLine />)
  .add("with color", () => (
    <SeparatorLine
      color={select("Color", Object.keys(defaultTheme.colors), "primaryBg")}
    />
  ))
  .add("with custom color", () => (
    <SeparatorLine color={color("Color", "#d90900")} />
  ))
  .add("with custom width", () => <SeparatorLine width={"4px"} />)
  .add("vertical", () => <SeparatorLine vertical size={"250px"} />);
