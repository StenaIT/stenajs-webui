import { Column, Row, Text } from "@stenajs-webui/core";
import { PrimaryButton } from "@stenajs-webui/elements";
import { Tooltip } from "./Tooltip";
import * as React from "react";

export default {
  title: "tooltip/Tooltip",
  component: Tooltip,
};

export const Standard = () => (
  <>
    <Row justifyContent={"space-between"} spacing={10}>
      <Tooltip placement={"bottom"} label={"Nice content on bottom"}>
        <Text>Hover me</Text>
      </Tooltip>
      <Tooltip placement={"left"} label={"Nice content on left"}>
        <Text>Hover me</Text>
      </Tooltip>
      <Tooltip placement={"right"} label={"Nice content on right"}>
        <Text>Hover me</Text>
      </Tooltip>
      <div />
    </Row>
    <Row justifyContent={"center"}>
      <Tooltip placement={"top"} label={"Nice content on top"}>
        <Text>Hover me</Text>
      </Tooltip>
    </Row>
  </>
);

export const ClickTrigger = () => (
  <Tooltip label={"Way to go!"} trigger={"click"}>
    <Text>Click me</Text>
  </Tooltip>
);

export const WithButton = () => (
  <Column justifyContent={"flex-start"} width={"fit-content"}>
    <Tooltip label={"Big success!"} trigger={"click"}>
      <PrimaryButton label={"Click me"} />
    </Tooltip>
  </Column>
);
