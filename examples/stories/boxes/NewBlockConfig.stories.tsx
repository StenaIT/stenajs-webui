import {
  Box,
  Column,
  Heading,
  Indent,
  Row,
  SeparatorLine,
  Space,
  Spacing,
  Text,
} from "@stenajs-webui/core";
import { PrimaryButton } from "@stenajs-webui/elements";
import { TextInput } from "@stenajs-webui/forms";
import { action } from "@storybook/addon-actions";
import * as React from "react";

export default {
  title: "examples/Boxes/NewBlockConfig",
};

export const NewBlockConfig = () => (
  <div style={{ display: "inline-block" }}>
    <Box shadow={"box"} background={"white"} display={"inline-block"}>
      <Spacing num={2}>
        <Indent num={2}>
          <Heading>New block config</Heading>
          <Space num={2} />
          <Column>
            <Text>Name</Text>
            <TextInput />
          </Column>
        </Indent>
        <Space num={2} />
        <SeparatorLine />
        <Space num={2} />

        <Indent num={2}>
          <Row>
            <Column>
              <Text>Customer</Text>
              <TextInput />
            </Column>
            <Space num={2} />
            <Column>
              <Text>Vehicle type</Text>
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
);
