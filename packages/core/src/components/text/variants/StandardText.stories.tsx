import { defaultTheme, StandardText } from "@stenajs-webui/core";
import { select, text } from "@storybook/addon-knobs";
import * as React from "react";

export default {
  title: "core/Text/StandardText"
};

export const Standard = () => (
  <StandardText
    color={select("Color", Object.keys(defaultTheme.colors), "primaryText")}
  >
    {text("Text", "That is some nice text, right there!")}
  </StandardText>
);

Standard.storyName = "standard";

export const HoverColor = () => (
  <StandardText
    hoverColor={select(
      "Color",
      Object.keys(defaultTheme.colors),
      "successGreen"
    )}
  >
    {text("Text", "That is some nice text, right there!")}
  </StandardText>
);

HoverColor.storyName = "hover color";

export const WithUnderline = () => (
  <StandardText textDecoration={"underline"}>
    That is some nice text, right there!
  </StandardText>
);

WithUnderline.storyName = "with underline";

export const WithUnderlineOnHover = () => (
  <StandardText hoverUnderline>
    That is some nice text, right there!
  </StandardText>
);

WithUnderlineOnHover.storyName = "with underline on hover";

export const WithSelectionDisabled = () => (
  <StandardText userSelect={"none"}>This text can not be selected</StandardText>
);

WithSelectionDisabled.storyName = "with selection disabled";

export const WithFontWeights = () => (
  <div>
    <div>
      <StandardText fontWeight={"normal"}>This text is normal.</StandardText>
    </div>
    <div>
      <StandardText fontWeight={"bold"}>This text is bold.</StandardText>
    </div>
    <div>
      <StandardText fontWeight={"light"}>This text is light.</StandardText>
    </div>
  </div>
);

WithFontWeights.storyName = "with font weights";
