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
import { PrimaryButton } from "@stenajs-webui/elements";
import { TextInput } from "@stenajs-webui/forms";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("examples/Boxes", module).add("New block config", () => (
  <div style={{ display: "inline-block" }}>
    <Box shadow={"box"} background={"white"} display={"inline-block"}>
      <Spacing num={2}>
        <Indent num={2}>
          <StandardText fontSize={"huge"}>New block config</StandardText>
          <Space num={2} />
          <Column>
            <StandardText>Name</StandardText>
            <TextInput />
          </Column>
        </Indent>
        <Space num={2} />
        <SeparatorLine />
        <Space num={2} />

        <Indent num={2}>
          <Row>
            <Column>
              <StandardText>Customer</StandardText>
              <TextInput />
            </Column>
            <Space num={2} />
            <Column>
              <StandardText>Vehicle type</StandardText>
              <TextInput />
            </Column>
          </Row>

          <Space num={2} />
          <Row justifyContent={"flex-end"}>
            <PrimaryButton label={"Send"} onClick={action("Submit clicked")} />
          </Row>
        </Indent>
      </Spacing>
    </Box>
  </div>
));
