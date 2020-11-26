import * as React from "react";
import { Clickable } from "./Clickable";
import { Text } from "../text/Text";

export default {
  title: "core/Interaction/Clickable",
  component: Clickable,
};

export const Default = () => (
  <Clickable onClick={() => alert("Clicked!")}>
    <Text>Click me!</Text>
  </Clickable>
);

export const WithDomIdAndClassName = () => (
  <Clickable
    onClick={() => alert("Clicked!")}
    id={"nice-clickable"}
    className={"nice-classname"}
  >
    <Text>I have id and class!</Text>
  </Clickable>
);

export const WithOpacityWhenMouseHoversOverClickable = () => (
  <Clickable opacityOnHover onClick={() => alert("Clicked!")}>
    <Text>Hover over me!</Text>
  </Clickable>
);

export const WithDoubleClick = () => (
  <Clickable onDblClick={() => alert("Double clicked!")}>
    <Text>Double click me!</Text>
  </Clickable>
);

export const WithNoPointerAsMouseCursor = () => (
  <Clickable disablePointer onClick={() => alert("Clicked!")}>
    <Text>Click me!</Text>
  </Clickable>
);

export const WithNoOpacityEffectWhenClicking = () => (
  <Clickable disableOpacityOnClick onClick={() => alert("Clicked!")}>
    <Text>Click me!</Text>
  </Clickable>
);

export const WithTooltip = () => (
  <Clickable
    tooltip={"This is some nice information"}
    onClick={() => alert("Clicked!")}
  >
    <Text>Hover me a second</Text>
  </Clickable>
);
