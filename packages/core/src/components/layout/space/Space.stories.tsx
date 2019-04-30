import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Box } from "../box/Box";
import { Row } from "../row/Row";
import { Space } from "./Space";

storiesOf("core/Layout/Space", module).add("standard", () => (
  <Row>
    <Box width={"50px"} height={"50px"} background={"red"} />
    <Space />
    <Box width={"50px"} height={"50px"} background={"blue"} />
  </Row>
));
