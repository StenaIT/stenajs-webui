import { defaultTheme, SmallerText } from "@stenajs-webui/core";
import { select, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("core/Text/SmallerText", module)
  .add("standard", () => (
    <SmallerText
      color={select("Color", Object.keys(defaultTheme.colors), "primaryText")}
    >
      {text("Text", "That is some nice text, right there!")}
    </SmallerText>
  ))
  .add("hover color", () => (
    <SmallerText
      hoverColor={select(
        "Color",
        Object.keys(defaultTheme.colors),
        "successGreen"
      )}
    >
      {text("Text", "That is some nice text, right there!")}
    </SmallerText>
  ))
  .add("with underline", () => (
    <SmallerText textDecoration={"underline"}>
      That is some nice text, right there!
    </SmallerText>
  ))
  .add("with underline on hover", () => (
    <SmallerText hoverUnderline>
      That is some nice text, right there!
    </SmallerText>
  ))
  .add("with selection disabled", () => (
    <SmallerText userSelect={"none"}>This text can not be selected</SmallerText>
  ))
  .add("with font weights", () => (
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
  ));
