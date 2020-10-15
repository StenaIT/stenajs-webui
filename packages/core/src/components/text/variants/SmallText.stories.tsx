import { defaultTheme, SmallText } from "@stenajs-webui/core";
import { select, text } from "@storybook/addon-knobs";
import * as React from "react";

export default {
  title: "core/Text/SmallText",
};

export const Standard = () => (
  <SmallText
    color={select("Color", Object.keys(defaultTheme.colors), "primaryText")}
  >
    {text("Text", "That is some nice text, right there!")}
  </SmallText>
);

export const HoverColor = () => (
  <SmallText
    hoverColor={select(
      "Color",
      Object.keys(defaultTheme.colors),
      "successGreen"
    )}
  >
    {text("Text", "That is some nice text, right there!")}
  </SmallText>
);

export const WithUnderline = () => (
  <SmallText textDecoration={"underline"}>
    That is some nice text, right there!
  </SmallText>
);

export const WithUnderlineOnHover = () => (
  <SmallText hoverUnderline>That is some nice text, right there!</SmallText>
);

export const WithSelectionDisabled = () => (
  <SmallText userSelect={"none"}>This text can not be selected</SmallText>
);

export const WithFontWeights = () => (
  <div>
    <div>
      <SmallText fontWeight={"normal"}>This text is normal.</SmallText>
    </div>
    <div>
      <SmallText fontWeight={"bold"}>This text is bold.</SmallText>
    </div>
    <div>
      <SmallText fontWeight={"light"}>This text is light.</SmallText>
    </div>
  </div>
);
