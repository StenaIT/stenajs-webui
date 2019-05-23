import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { StandardText } from "../variants/StandardText";

storiesOf("core/Text/StandardText", module)
  .add("standard", () => (
    <StandardText>
      {text("Text", "That is some nice text, right there!")}
    </StandardText>
  ))
  .add("with underline", () => (
    <StandardText textDecoration={"underline"}>
      That is some nice text, right there!
    </StandardText>
  ))
  .add("with underline on hover", () => (
    <StandardText hoverUnderline>
      That is some nice text, right there!
    </StandardText>
  ))
  .add("with selection disabled", () => (
    <StandardText userSelect={"none"}>
      This text can not be selected
    </StandardText>
  ))
  .add("with font weights", () => (
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
  ));
