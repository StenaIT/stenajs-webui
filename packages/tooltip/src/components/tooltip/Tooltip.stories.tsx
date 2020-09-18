import { Row, StandardText } from "@stenajs-webui/core";
import { PrimaryButton } from "@stenajs-webui/elements";
import { Tooltip } from "@stenajs-webui/tooltip";
import * as React from "react";

export default {
  title: "tooltip/Tooltip"
};

export const Standard = () => (
  <>
    <Row justifyContent={"space-between"} spacing={10}>
      <Tooltip placement={"bottom"} label={"Nice content on bottom"}>
        <StandardText>Hover me</StandardText>
      </Tooltip>
      <Tooltip placement={"left"} label={"Nice content on left"}>
        <StandardText>Hover me</StandardText>
      </Tooltip>
      <Tooltip placement={"right"} label={"Nice content on right"}>
        <StandardText>Hover me</StandardText>
      </Tooltip>
      <div />
    </Row>
    <Row justifyContent={"center"}>
      <Tooltip placement={"top"} label={"Nice content on top"}>
        <StandardText>Hover me</StandardText>
      </Tooltip>
    </Row>
  </>
);

Standard.storyName = "standard";

export const ClickTrigger = () => (
  <Tooltip label={"Way to go!"} trigger={"click"}>
    <StandardText>Click me</StandardText>
  </Tooltip>
);

ClickTrigger.storyName = "click trigger";

export const WithButton = () => (
  <Tooltip label={"Big success!"} trigger={"click"}>
    {({ show }) => <PrimaryButton onClick={show} label={"Click me"} />}
  </Tooltip>
);

WithButton.storyName = "with button";
