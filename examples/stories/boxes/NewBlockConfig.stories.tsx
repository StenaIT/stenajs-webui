import {
  Box,
  Column,
  Indent,
  Row,
  SeparatorLine,
  Space,
  Spacing,
  StandardText
} from "@stenajs-webui/core";
import { StandardButton } from "@stenajs-webui/elements";
import { StandardTextInput } from "@stenajs-webui/forms";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("examples/Boxes", module)
  .addDecorator(withInfo())
  .add("New block config", () => (
    <Box shadow={"box"} background={"white"} display={"inline-block"}>
      <Spacing num={2}>
        <Indent num={2}>
          <StandardText fontSize={"huge"}>New block config</StandardText>
          <Space num={2} />
          <Column>
            <StandardText>Name</StandardText>
            <StandardTextInput />
          </Column>
        </Indent>
        <Space num={2} />
        <SeparatorLine />
        <Space num={2} />

        <Indent num={2}>
          <Row>
            <Column>
              <StandardText>Customer</StandardText>
              <StandardTextInput />
            </Column>
            <Space num={2} />
            <Column>
              <StandardText>Vehicle type</StandardText>
              <StandardTextInput />
            </Column>
          </Row>

          <Space num={2}/>
          <Row justifyContent={"flex-end"}>
            <StandardButton label={"Send"} onClick={() => alert("send")} />
          </Row>
        </Indent>
      </Spacing>
    </Box>
  ));
