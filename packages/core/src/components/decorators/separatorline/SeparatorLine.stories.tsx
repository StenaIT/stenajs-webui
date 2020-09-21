import { defaultTheme, SeparatorLine } from "@stenajs-webui/core";
import { color, select } from "@storybook/addon-knobs";
import * as React from "react";

export default {
  title: "core/Decorators/SeparatorLine",
};

export const Standard = () => <SeparatorLine />;

Standard.storyName = "standard";

export const WithColor = () => (
  <SeparatorLine
    color={select("Color", Object.keys(defaultTheme.colors), "primaryBg")}
  />
);

WithColor.storyName = "with color";

export const WithCustomColor = () => (
  <SeparatorLine color={color("Color", "#d90900")} />
);

WithCustomColor.storyName = "with custom color";

export const WithCustomWidth = () => <SeparatorLine width={"4px"} />;

WithCustomWidth.storyName = "with custom width";

export const Vertical = () => <SeparatorLine vertical size={"250px"} />;

Vertical.storyName = "vertical";
