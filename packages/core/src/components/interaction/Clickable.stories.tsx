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

Default.storyName = "default";

export const WithDomIdAndClassName = () => (
  <Clickable
    onClick={() => alert("Clicked!")}
    id={"nice-clickable"}
    className={"nice-classname"}
  >
    <StandardText>I have id and class!</StandardText>
  </Clickable>
);

WithDomIdAndClassName.storyName = "with DOM id and class name";

export const WithOpacityWhenMouseHoversOverClickable = () => (
  <Clickable opacityOnHover onClick={() => alert("Clicked!")}>
    <StandardText>Hover over me!</StandardText>
  </Clickable>
);

WithOpacityWhenMouseHoversOverClickable.storyName =
  "with opacity when mouse hovers over clickable";

export const WithDoubleClick = () => (
  <Clickable onDblClick={() => alert("Double clicked!")}>
    <StandardText>Double click me!</StandardText>
  </Clickable>
);

WithDoubleClick.storyName = "with double click";

export const WithNoPointerAsMouseCursor = () => (
  <Clickable disablePointer onClick={() => alert("Clicked!")}>
    <StandardText>Click me!</StandardText>
  </Clickable>
);

WithNoPointerAsMouseCursor.storyName = "with no pointer as mouse cursor";

export const WithNoOpacityEffectWhenClicking = () => (
  <Clickable disableOpacityOnClick onClick={() => alert("Clicked!")}>
    <StandardText>Click me!</StandardText>
  </Clickable>
);

WithNoOpacityEffectWhenClicking.storyName =
  "with no opacity effect when clicking";

export const WithTooltip = () => (
  <Clickable
    tooltip={"This is some nice information"}
    onClick={() => alert("Clicked!")}
  >
    <StandardText>Hover me a second</StandardText>
  </Clickable>
);

WithTooltip.storyName = "with tooltip";
