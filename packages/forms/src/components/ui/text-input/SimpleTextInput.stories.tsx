import { SimpleTextInput } from "@stenajs-webui/forms";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("forms/TextInput/SimpleTextInput", module)
  .add("standard", () => <SimpleTextInput value={"some entered text"} />)
  .add("empty", () => <SimpleTextInput value={""} />)
  .add("focus on mount", () => <SimpleTextInput value={""} focusOnMount />)
  .add("select all on mount", () => (
    <SimpleTextInput value={"this is selected"} selectAllOnMount />
  ))
  .add("with placeholder", () => (
    <SimpleTextInput value={""} placeholder={"Enter name"} />
  ))
  .add("with placeholder color", () => (
    <SimpleTextInput
      value={""}
      placeholder={"Enter name"}
      placeholderColor={"red"}
    />
  ))
  .add("disabled", () => (
    <SimpleTextInput value={""} placeholder={"Enter name"} disabled={true} />
  ))
  .add("invalid", () => (
    <SimpleTextInput
      value={"invalid input"}
      placeholder={"Enter name"}
      invalid={true}
    />
  ));
