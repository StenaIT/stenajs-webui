import * as React from "react";
import { Column, Spacing, Text } from "@stenajs-webui/core";
import { TextInput } from "@stenajs-webui/forms";
import { Label, LabelProps } from "./Label";
import { Story } from "@storybook/react";
import { hideArg } from "../../../storybook-helpers/storybook-controls";

export default {
  title: "elements/Label",
  component: Label,
  argTypes: {
    color: hideArg,
    spacing: hideArg,
    indent: hideArg,
    style: hideArg,
    shadow: hideArg,
    border: hideArg,
    background: hideArg,
    borderColor: hideArg,
    hoverBackground: hideArg,
    hoverBorder: hideArg,
    focusBackground: hideArg,
    focusBorder: hideArg,
    focusWithinBackground: hideArg,
    focusWithinBorder: hideArg,
  },
  args: {
    text: "First name",
  },
};

export const Overview: Story<LabelProps> = (props) => (
  <Column width={300}>
    <Label {...props}>
      <TextInput />
    </Label>
  </Column>
);

export const WithTextOnly = () => (
  <Column width={300}>
    <Label text={"First name"}>
      <Text>Donald</Text>
    </Label>
  </Column>
);

export const Row = () => (
  <Column width={300}>
    <Label text={"First name"} row>
      <TextInput />
    </Label>
    <Spacing />
    <Label text={"Last name"} row>
      <TextInput />
    </Label>
  </Column>
);

export const RowWithTextWidth = () => (
  <Column width={400}>
    <Label text={"First name very long name"} textWidth={"25em"} row>
      <TextInput />
    </Label>
    <Spacing />
    <Label text={"Last name"} textWidth={"25em"} row>
      <TextInput />
    </Label>
  </Column>
);

export const WithExtraInfo = () => (
  <Column width={400}>
    <Label text={"First name"} optional>
      <TextInput />
    </Label>
    <Spacing />
    <Label text={"Last name"} optional maxCharacters={100}>
      <TextInput />
    </Label>
  </Column>
);

export const WithExtraInfoRow = () => (
  <Column width={400}>
    <Label text={"First name"} optional row>
      <TextInput />
    </Label>
    <Spacing />
    <Label text={"Last name"} optional maxCharacters={100} row>
      <TextInput />
    </Label>
  </Column>
);
