import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { StandardText } from "../text/variants/StandardText";
import { Clickable } from "./Clickable";

storiesOf("core/Interaction/Clickable", module)
  .addDecorator(withInfo())
  .add("default", () => (
    <Clickable onClick={() => alert("Clicked!")}>
      <StandardText>Click me!</StandardText>
    </Clickable>
  ))
  .add("with opacity when mouse hovers over clickable", () => (
    <Clickable opacityOnHover onClick={() => alert("Clicked!")}>
      <StandardText>Hover over me!</StandardText>
    </Clickable>
  ))
  .add("with double click", () => (
    <Clickable onDblClick={() => alert("Double clicked!")}>
      <StandardText>Double click me!</StandardText>
    </Clickable>
  ))
  .add("with no pointer as mouse cursor", () => (
    <Clickable disablePointer onClick={() => alert("Clicked!")}>
      <StandardText>Click me!</StandardText>
    </Clickable>
  ))
  .add("with no opacity effect when clicking", () => (
    <Clickable disableOpacityOnClick onClick={() => alert("Clicked!")}>
      <StandardText>Click me!</StandardText>
    </Clickable>
  ))
  .add("with tooltip", () => (
    <Clickable
      tooltip={"This is some nice information"}
      onClick={() => alert("Clicked!")}
    >
      <StandardText>Hover me a second</StandardText>
    </Clickable>
  ));
