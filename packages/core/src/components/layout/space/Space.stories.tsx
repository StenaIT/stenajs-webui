import { Box, Row, Space } from "@stenajs-webui/core";
import * as React from "react";

export default {
  title: "core/Layout/Space"
};

export const Standard = () => (
  <Row>
    <Box width={"50px"} height={"50px"} background={"red"} />
    <Space />
    <Box width={"50px"} height={"50px"} background={"blue"} />
  </Row>
);

Standard.story = {
  name: "standard"
};

export const Num2 = () => (
  <Row>
    <Box width={"50px"} height={"50px"} background={"red"} />
    <Space num={2} />
    <Box width={"50px"} height={"50px"} background={"blue"} />
  </Row>
);

Num2.story = {
  name: "num=2"
};
