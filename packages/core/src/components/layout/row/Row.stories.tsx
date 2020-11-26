import * as React from "react";
import { Box } from "../box/Box";
import { Row } from "./Row";
import { Text } from "../../text/Text";
import { Space } from "../space/Space";

export default {
  title: "core/Layout/Row",
  component: Row,
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
      <Text>center</Text>
    </Box>
    <Row justifyContent={"center"}>
      <Box width={"50px"} height={"50px"} background={"red"} />
      <Space />
      <Box width={"50px"} height={"50px"} background={"blue"} />
    </Row>
    <Box spacing>
      <Space />
    </Box>
    <Text>flex-end</Text>
    <Row justifyContent={"flex-end"}>
      <Box width={"50px"} height={"50px"} background={"red"} />
      <Space />
      <Box width={"50px"} height={"50px"} background={"blue"} />
    </Row>
    <Box spacing>
      <Text>space-between</Text>
    </Box>
    <Row justifyContent={"space-between"}>
      <Box width={"50px"} height={"50px"} background={"red"} />
      <Space />
      <Box width={"50px"} height={"50px"} background={"blue"} />
    </Row>
    <Space />
  </Box>
);
