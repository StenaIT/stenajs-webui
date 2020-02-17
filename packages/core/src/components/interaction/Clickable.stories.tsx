import {
  Box,
  Clickable,
  StandardText,
  useDefaultClickable
} from "@stenajs-webui/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";

const ClickableHook = () => {
  const boxProps = useDefaultClickable();
  return (
    <Box element={"button"} {...boxProps} onClick={() => alert("Click")}>
      <StandardText>Click me!</StandardText>
    </Box>
  );
};

storiesOf("core/Interaction/Clickable", module)
  .add("default", () => (
    <Clickable onClick={() => alert("Clicked!")}>
      <StandardText>Click me!</StandardText>
    </Clickable>
  ))
  .add("Box with clickable hook", () => <ClickableHook />)
  .add("with DOM id and class name", () => (
    <Clickable
      onClick={() => alert("Clicked!")}
      id={"nice-clickable"}
      className={"nice-classname"}
    >
      <StandardText>I have id and class!</StandardText>
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
