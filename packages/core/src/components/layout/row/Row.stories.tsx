import { Box, Row, Space, StandardText } from "@stenajs-webui/core";
import * as React from "react";

export default {
  title: "core/Layout/Row",
};

export const Standard = () => (
  <Box border={"1px solid black"} width={"250px"}>
    <Row>
      <Box width={"50px"} height={"50px"} background={"red"} />
      <Space />
      <Box width={"50px"} height={"50px"} background={"blue"} />
    </Row>
  </Box>
);

export const WithJustifyContent = () => (
  <Box border={"1px solid black"} width={"250px"} indent>
    <Box spacing>
      <StandardText>center</StandardText>
    </Box>
    <Row justifyContent={"center"}>
      <Box width={"50px"} height={"50px"} background={"red"} />
      <Space />
      <Box width={"50px"} height={"50px"} background={"blue"} />
    </Row>
    <Box spacing>
      <Space />
    </Box>
    <StandardText>flex-end</StandardText>
    <Row justifyContent={"flex-end"}>
      <Box width={"50px"} height={"50px"} background={"red"} />
      <Space />
      <Box width={"50px"} height={"50px"} background={"blue"} />
    </Row>
    <Box spacing>
      <StandardText>space-between</StandardText>
    </Box>
    <Row justifyContent={"space-between"}>
      <Box width={"50px"} height={"50px"} background={"red"} />
      <Space />
      <Box width={"50px"} height={"50px"} background={"blue"} />
    </Row>
    <Space />
  </Box>
);
