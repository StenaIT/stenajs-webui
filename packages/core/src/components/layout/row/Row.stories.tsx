import { storiesOf } from "@storybook/react";
import * as React from "react";
import { StandardText } from "../../text/variants/StandardText";
import { Box } from "../box/Box";
import { Space } from "../space/Space";

import { Row } from "./Row";

storiesOf("core/Layout/Row", module)
  .add("standard", () => (
    <Box border={"1px solid black"} width={"250px"}>
      <Row>
        <Box width={"50px"} height={"50px"} background={"red"} />
        <Space />
        <Box width={"50px"} height={"50px"} background={"blue"} />
      </Row>
    </Box>
  ))
  .add("with justify-content", () => (
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
  ));
