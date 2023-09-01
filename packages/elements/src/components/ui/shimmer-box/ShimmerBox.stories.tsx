import { Box, Column, Row, Space } from "@stenajs-webui/core";
import * as React from "react";
import { ShimmerBox } from "./ShimmerBox";

export default {
  title: "elements/ShimmerBox",
  component: ShimmerBox,
};

export const Demo = () => (
  <Row width={"400px"} shadow={"box"}>
    <Box flex={4} indent={2} spacing={2}>
      <Column data-testid={"sailing-summary-cell"} alignItems={"flex-start"}>
        <ShimmerBox height={"1.8rem"} width={"110px"} borderRadius={"8px"} />
        <Space />
        <ShimmerBox height={"1.4rem"} width={"50px"} borderRadius={"8px"} />
        <Space />
        <ShimmerBox height={"1.4rem"} width={"100px"} borderRadius={"8px"} />
      </Column>
    </Box>
    <Box indent={2} spacing={2}>
      <Column alignItems={"flex-end"} height={"76px"}>
        <ShimmerBox width={"100px"} height={"2.0rem"} borderRadius={"8px"} />
      </Column>
    </Box>
  </Row>
);
