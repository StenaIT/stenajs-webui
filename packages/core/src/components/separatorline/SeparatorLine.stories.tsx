import { color, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { defaultTheme } from "../../theme/DefaultTheme";
import { SeparatorLine } from "./SeparatorLine";

storiesOf("core/SeparatorLine/SeparatorLine", module)
  .add("standard", () => <SeparatorLine />)
  .add("with color", () => (
    <SeparatorLine color={select("Color", Object.keys(defaultTheme.colors), "primaryBg")} />
  ))
  .add("with custom color", () => (
    <SeparatorLine color={color("Color", "#d90900")} />
  ))
  .add("with custom width", () => <SeparatorLine width={"4px"} />)
  .add("vertical", () => <SeparatorLine vertical size={"250px"} />);
