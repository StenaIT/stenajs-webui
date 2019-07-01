import { Box, Row, Space } from "@stenajs-webui/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("core/Layout/Space", module)
  .add("standard", () => (
    <Row>
      <Box width={"50px"} height={"50px"} background={"red"} />
      <Space />
      <Box width={"50px"} height={"50px"} background={"blue"} />
    </Row>
  ))
  .add("num=2", () => (
    <Row>
      <Box width={"50px"} height={"50px"} background={"red"} />
      <Space num={2} />
      <Box width={"50px"} height={"50px"} background={"blue"} />
    </Row>
  ));
