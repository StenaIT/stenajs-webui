import { defaultTheme, HeaderText } from "@stenajs-webui/core";
import { select, text } from "@storybook/addon-knobs";
import * as React from "react";

export default {
  title: "core/Text/HeaderText",
};

export const Standard = () => (
  <HeaderText
    color={select("Color", Object.keys(defaultTheme.colors), "primaryText")}
  >
    {text("Text", "That is some nice text, right there!")}
  </HeaderText>
);

export const HoverColor = () => (
  <HeaderText
    hoverColor={select(
      "Color",
      Object.keys(defaultTheme.colors),
      "successGreen"
    )}
  >
    {text("Text", "That is some nice text, right there!")}
  </HeaderText>
);

export const WithUnderline = () => (
  <HeaderText textDecoration={"underline"}>
    That is some nice text, right there!
  </HeaderText>
);

export const WithUnderlineOnHover = () => (
  <HeaderText hoverUnderline>That is some nice text, right there!</HeaderText>
);

export const WithSelectionDisabled = () => (
  <HeaderText userSelect={"none"}>This text can not be selected</HeaderText>
);

export const WithFontWeights = () => (
  <div>
    <div>
      <HeaderText fontWeight={"normal"}>This text is normal.</HeaderText>
    </div>
    <div>
      <HeaderText fontWeight={"bold"}>This text is bold.</HeaderText>
    </div>
    <div>
      <HeaderText fontWeight={"light"}>This text is light.</HeaderText>
    </div>
  </div>
);
