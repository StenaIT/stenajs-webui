import { defaultTheme, TinyText } from "@stenajs-webui/core";
import { select, text } from "@storybook/addon-knobs";
import * as React from "react";

export default {
  title: "core/Text/TinyText"
};

export const Standard = () => (
  <TinyText
    color={select("Color", Object.keys(defaultTheme.colors), "primaryText")}
  >
    {text("Text", "That is some nice text, right there!")}
  </TinyText>
);

Standard.storyName = "standard";

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

HoverColor.storyName = "hover color";

export const WithUnderline = () => (
  <TinyText textDecoration={"underline"}>
    That is some nice text, right there!
  </TinyText>
);

WithUnderline.storyName = "with underline";

export const WithUnderlineOnHover = () => (
  <TinyText hoverUnderline>That is some nice text, right there!</TinyText>
);

WithUnderlineOnHover.storyName = "with underline on hover";

export const WithSelectionDisabled = () => (
  <TinyText userSelect={"none"}>This text can not be selected</TinyText>
);

WithSelectionDisabled.storyName = "with selection disabled";

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

WithFontWeights.storyName = "with font weights";
