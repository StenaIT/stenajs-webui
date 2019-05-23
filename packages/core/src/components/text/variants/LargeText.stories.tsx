import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { LargeText } from "../variants/LargeText";

storiesOf("core/Text/LargeText", module)
  .add("standard", () => (
    <LargeText>
      {text("Text", "That is some nice text, right there!")}
    </LargeText>
  ))
  .add("with underline", () => (
    <LargeText textDecoration={"underline"}>
      That is some nice text, right there!
    </LargeText>
  ))
  .add("with underline on hover", () => (
    <LargeText hoverUnderline>
      That is some nice text, right there!
    </LargeText>
  ))
  .add("with selection disabled", () => (
    <LargeText userSelect={"none"}>
      This text can not be selected
    </LargeText>
  ))
  .add("with font weights", () => (
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
  ));
