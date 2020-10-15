import { Clickable, StandardText } from "@stenajs-webui/core";
import * as React from "react";

export default {
  title: "core/Interaction/Clickable",
};

export const Default = () => (
  <Clickable onClick={() => alert("Clicked!")}>
    <StandardText>Click me!</StandardText>
  </Clickable>
);

export const WithDomIdAndClassName = () => (
  <Clickable
    onClick={() => alert("Clicked!")}
    id={"nice-clickable"}
    className={"nice-classname"}
  >
    <StandardText>I have id and class!</StandardText>
  </Clickable>
);

export const WithOpacityWhenMouseHoversOverClickable = () => (
  <Clickable opacityOnHover onClick={() => alert("Clicked!")}>
    <StandardText>Hover over me!</StandardText>
  </Clickable>
);

export const WithDoubleClick = () => (
  <Clickable onDblClick={() => alert("Double clicked!")}>
    <StandardText>Double click me!</StandardText>
  </Clickable>
);

export const WithNoPointerAsMouseCursor = () => (
  <Clickable disablePointer onClick={() => alert("Clicked!")}>
    <StandardText>Click me!</StandardText>
  </Clickable>
);

export const WithNoOpacityEffectWhenClicking = () => (
  <Clickable disableOpacityOnClick onClick={() => alert("Clicked!")}>
    <StandardText>Click me!</StandardText>
  </Clickable>
);

export const WithTooltip = () => (
  <Clickable
    tooltip={"This is some nice information"}
    onClick={() => alert("Clicked!")}
  >
    <StandardText>Hover me a second</StandardText>
  </Clickable>
);
