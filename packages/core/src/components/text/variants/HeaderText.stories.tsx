import { defaultTheme, HeaderText } from "@stenajs-webui/core";
import { select, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("core/Text/HeaderText", module)
  .add("standard", () => (
    <HeaderText
      color={select("Color", Object.keys(defaultTheme.colors), "primaryText")}
    >
      {text("Text", "That is some nice text, right there!")}
    </HeaderText>
  ))
  .add("hover color", () => (
    <HeaderText
      hoverColor={select(
        "Color",
        Object.keys(defaultTheme.colors),
        "successGreen"
      )}
    >
      {text("Text", "That is some nice text, right there!")}
    </HeaderText>
  ))
  .add("with underline", () => (
    <HeaderText textDecoration={"underline"}>
      That is some nice text, right there!
    </HeaderText>
  ))
  .add("with underline on hover", () => (
    <HeaderText hoverUnderline>That is some nice text, right there!</HeaderText>
  ))
  .add("with selection disabled", () => (
    <HeaderText userSelect={"none"}>This text can not be selected</HeaderText>
  ))
  .add("with font weights", () => (
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
  ));
