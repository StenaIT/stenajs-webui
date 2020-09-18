import { defaultTheme, LargeText } from "@stenajs-webui/core";
import { select, text } from "@storybook/addon-knobs";
import * as React from "react";

export default {
  title: "core/Text/LargeText"
};

export const Standard = () => (
  <LargeText
    color={select("Color", Object.keys(defaultTheme.colors), "primaryText")}
  >
    {text("Text", "That is some nice text, right there!")}
  </LargeText>
);

Standard.story = {
  name: "standard"
};

export const HoverColor = () => (
  <LargeText
    hoverColor={select(
      "Color",
      Object.keys(defaultTheme.colors),
      "successGreen"
    )}
  >
    {text("Text", "That is some nice text, right there!")}
  </LargeText>
);

HoverColor.story = {
  name: "hover color"
};

export const WithUnderline = () => (
  <LargeText textDecoration={"underline"}>
    That is some nice text, right there!
  </LargeText>
);

WithUnderline.story = {
  name: "with underline"
};

export const WithUnderlineOnHover = () => (
  <LargeText hoverUnderline>That is some nice text, right there!</LargeText>
);

WithUnderlineOnHover.story = {
  name: "with underline on hover"
};

export const WithSelectionDisabled = () => (
  <LargeText userSelect={"none"}>This text can not be selected</LargeText>
);

WithSelectionDisabled.story = {
  name: "with selection disabled"
};

export const WithFontWeights = () => (
  <div>
    <div>
      <LargeText fontWeight={"normal"}>This text is normal.</LargeText>
    </div>
    <div>
      <LargeText fontWeight={"bold"}>This text is bold.</LargeText>
    </div>
    <div>
      <LargeText fontWeight={"light"}>This text is light.</LargeText>
    </div>
  </div>
);

WithFontWeights.story = {
  name: "with font weights"
};
