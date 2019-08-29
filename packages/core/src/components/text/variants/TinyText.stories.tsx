import { TinyText } from "@stenajs-webui/core";
import { select, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { defaultTheme } from "../../../theme/DefaultTheme";

storiesOf("core/Text/TinyText", module)
  .add("standard", () => (
    <TinyText
      color={select("Color", Object.keys(defaultTheme.colors), "primaryText")}
    >
      {text("Text", "That is some nice text, right there!")}
    </TinyText>
  ))
  .add("hover color", () => (
    <TinyText
      hoverColor={select(
        "Color",
        Object.keys(defaultTheme.colors),
        "successGreen"
      )}
    >
      {text("Text", "That is some nice text, right there!")}
    </TinyText>
  ))
  .add("with underline", () => (
    <TinyText textDecoration={"underline"}>
      That is some nice text, right there!
    </TinyText>
  ))
  .add("with underline on hover", () => (
    <TinyText hoverUnderline>That is some nice text, right there!</TinyText>
  ))
  .add("with selection disabled", () => (
    <TinyText userSelect={"none"}>This text can not be selected</TinyText>
  ))
  .add("with font weights", () => (
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
  ));
