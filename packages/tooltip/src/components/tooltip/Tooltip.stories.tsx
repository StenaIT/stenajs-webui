import { Column, Row, StandardText } from "@stenajs-webui/core";
import { PrimaryButton } from "@stenajs-webui/elements";
import { Tooltip } from "@stenajs-webui/tooltip";
import * as React from "react";

export default {
  title: "tooltip/Tooltip",
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

export const ClickTrigger = () => (
  <Tooltip label={"Way to go!"} trigger={"click"}>
    <StandardText>Click me</StandardText>
  </Tooltip>
);

export const WithButton = () => (
  <Column justifyContent={"flex-start"} width={"fit-content"}>
    <Tooltip label={"Big success!"} trigger={"click"}>
      <PrimaryButton label={"Click me"} />
    </Tooltip>
  </Column>
);
