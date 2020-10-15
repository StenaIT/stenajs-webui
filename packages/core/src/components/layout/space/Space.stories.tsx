import { Box, Row, Space } from "@stenajs-webui/core";
import * as React from "react";

export default {
  title: "core/Layout/Space",
};

export const Standard = () => (
  <Row>
    <Box width={"50px"} height={"50px"} background={"red"} />
    <Space />
    <Box width={"50px"} height={"50px"} background={"blue"} />
  </Row>
);

export const Num2 = () => (
  <Row>
    <Box width={"50px"} height={"50px"} background={"red"} />
    <Space num={2} />
    <Box width={"50px"} height={"50px"} background={"blue"} />
  </Row>
);
