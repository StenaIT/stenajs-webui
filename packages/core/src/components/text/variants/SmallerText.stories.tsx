import { defaultTheme, SmallerText } from "@stenajs-webui/core";
import { select, text } from "@storybook/addon-knobs";
import * as React from "react";

export default {
  title: "core/Text/SmallerText"
};

export const Standard = () => (
  <SmallerText
    color={select("Color", Object.keys(defaultTheme.colors), "primaryText")}
  >
    {text("Text", "That is some nice text, right there!")}
  </SmallerText>
);

Standard.storyName = "standard";

export const HoverColor = () => (
  <SmallerText
    hoverColor={select(
      "Color",
      Object.keys(defaultTheme.colors),
      "successGreen"
    )}
  >
    {text("Text", "That is some nice text, right there!")}
  </SmallerText>
);

HoverColor.storyName = "hover color";

export const WithUnderline = () => (
  <SmallerText textDecoration={"underline"}>
    That is some nice text, right there!
  </SmallerText>
);

WithUnderline.storyName = "with underline";

export const WithUnderlineOnHover = () => (
  <SmallerText hoverUnderline>That is some nice text, right there!</SmallerText>
);

WithUnderlineOnHover.storyName = "with underline on hover";

export const WithSelectionDisabled = () => (
  <SmallerText userSelect={"none"}>This text can not be selected</SmallerText>
);

WithSelectionDisabled.storyName = "with selection disabled";

export const WithFontWeights = () => (
  <div>
    <div>
      <SmallerText fontWeight={"normal"}>This text is normal.</SmallerText>
    </div>
    <div>
      <SmallerText fontWeight={"bold"}>This text is bold.</SmallerText>
    </div>
    <div>
      <SmallerText fontWeight={"light"}>This text is light.</SmallerText>
    </div>
  </div>
);

WithFontWeights.storyName = "with font weights";
