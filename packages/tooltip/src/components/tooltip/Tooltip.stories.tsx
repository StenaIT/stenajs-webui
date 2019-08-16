import { Row, StandardText } from "@stenajs-webui/core";
import { StandardButton } from "@stenajs-webui/elements";
import { Tooltip } from "@stenajs-webui/tooltip";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("tooltip/Tooltip", module)
  .add("standard", () => (
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
  ))
  .add("click trigger", () => (
    <Tooltip label={"Way to go!"} trigger={"click"}>
      <StandardText>Click me</StandardText>
    </Tooltip>
  ))
  .add("with button", () => (
    <Tooltip label={"Big success!"} trigger={"click"}>
      {({ show }) => <StandardButton onClick={show} label={"Click me"} />}
    </Tooltip>
  ));
