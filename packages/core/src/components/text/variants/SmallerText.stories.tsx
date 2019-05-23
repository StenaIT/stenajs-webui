import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { SmallerText } from "../variants/SmallerText";

storiesOf("core/Text/SmallerText", module)
  .add("standard", () => (
    <SmallerText>
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
    <SmallerText userSelect={"none"}>
      This text can not be selected
    </SmallerText>
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
