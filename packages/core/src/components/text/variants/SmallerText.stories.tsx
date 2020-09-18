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

Standard.story = {
  name: "standard"
};

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

HoverColor.story = {
  name: "hover color"
};

export const WithUnderline = () => (
  <SmallerText textDecoration={"underline"}>
    That is some nice text, right there!
  </SmallerText>
);

WithUnderline.story = {
  name: "with underline"
};

export const WithUnderlineOnHover = () => (
  <SmallerText hoverUnderline>That is some nice text, right there!</SmallerText>
);

WithUnderlineOnHover.story = {
  name: "with underline on hover"
};

export const WithSelectionDisabled = () => (
  <SmallerText userSelect={"none"}>This text can not be selected</SmallerText>
);

WithSelectionDisabled.story = {
  name: "with selection disabled"
};

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

WithFontWeights.story = {
  name: "with font weights"
};
