import { Column, Spacing, StandardText } from "@stenajs-webui/core";
import * as React from "react";
import { Label } from "@stenajs-webui/elements";
import { TextInput } from "@stenajs-webui/forms";

export default {
  title: "elements/Label",
};

export const Standard = () => (
  <Column>
    <Label text={"First name"}>
      <StandardText>Donald</StandardText>
    </Label>
  </Column>
);

export const WithTextInput = () => (
  <Column width={"200px"}>
    <Label text={"First name"}>
      <TextInput />
    </Label>
    <Spacing />
    <Label text={"Last name"}>
      <TextInput />
    </Label>
  </Column>
);

export const Row = () => (
  <Column width={"300px"}>
    <Label text={"First name"} row>
      <TextInput />
    </Label>
    <Spacing />
    <Label text={"Last name"} row>
      <TextInput />
    </Label>
  </Column>
);

export const WithExtraInfo = () => (
  <Column width={"400px"}>
    <Label text={"First name"} optional>
      <TextInput />
    </Label>
    <Spacing />
    <Label text={"Last name"} optional maxCharacters={100}>
      <TextInput />
    </Label>
  </Column>
);
