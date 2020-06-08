import { storiesOf } from "@storybook/react";
import { Box } from "@stenajs-webui/core";
import * as knobs from "@storybook/addon-knobs";
import * as React from "react";
import { TextArea } from "@stenajs-webui/forms";

storiesOf("forms/TextInput/TextArea", module)
  .add("standard", () => (
    <TextArea value={knobs.text("Text", "Some nice text.")} />
  ))
  .add("with custom size", () => (
    <Box width={"400px"}>
      <TextArea rows={3} value={knobs.text("Text", "Some nice text.")} />
    </Box>
  ))
  .add("with resize", () => (
    <TextArea resize={"both"} value={knobs.text("Text", "Some nice text.")} />
  ))
  .add("readonly", () => (
    <TextArea readOnly value={knobs.text("Text", "Some nice text.")} />
  ))
  .add("disabled", () => (
    <TextArea disabled value={knobs.text("Text", "Some nice text.")} />
  ));
