import { defaultTheme, SeparatorLine } from "@stenajs-webui/core";
import { color, select } from "@storybook/addon-knobs";
import * as React from "react";

export default {
  title: "core/Decorators/SeparatorLine",
};

export const Standard = () => <SeparatorLine />;

export const WithColor = () => (
  <SeparatorLine
    color={select("Color", Object.keys(defaultTheme.colors), "primaryBg")}
  />
);

export const WithCustomColor = () => (
  <SeparatorLine color={color("Color", "#d90900")} />
);

export const WithCustomWidth = () => <SeparatorLine width={"4px"} />;

export const Vertical = () => <SeparatorLine vertical size={"250px"} />;
