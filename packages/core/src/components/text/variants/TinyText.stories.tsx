import { defaultTheme, TinyText } from "@stenajs-webui/core";
import { select, text } from "@storybook/addon-knobs";
import * as React from "react";

export default {
  title: "core/Text/TinyText",
};

export const Standard = () => (
  <TinyText
    color={select("Color", Object.keys(defaultTheme.colors), "primaryText")}
  >
    {text("Text", "That is some nice text, right there!")}
  </TinyText>
);

export const HoverColor = () => (
  <TinyText
    hoverColor={select(
      "Color",
      Object.keys(defaultTheme.colors),
      "successGreen"
    )}
  >
    {text("Text", "That is some nice text, right there!")}
  </TinyText>
);

export const WithUnderline = () => (
  <TinyText textDecoration={"underline"}>
    That is some nice text, right there!
  </TinyText>
);

export const WithUnderlineOnHover = () => (
  <TinyText hoverUnderline>That is some nice text, right there!</TinyText>
);

export const WithSelectionDisabled = () => (
  <TinyText userSelect={"none"}>This text can not be selected</TinyText>
);

export const WithFontWeights = () => (
  <div>
    <div>
      <TinyText fontWeight={"normal"}>This text is normal.</TinyText>
    </div>
    <div>
      <TinyText fontWeight={"bold"}>This text is bold.</TinyText>
    </div>
    <div>
      <TinyText fontWeight={"light"}>This text is light.</TinyText>
    </div>
  </div>
);
