import { Box } from "@stenajs-webui/core";
import * as knobs from "@storybook/addon-knobs";
import * as React from "react";
import { TextArea } from "@stenajs-webui/forms";

export default {
  title: "forms/TextInput/TextArea"
};

export const Standard = () => (
  <TextArea value={knobs.text("Text", "Some nice text.")} />
);

Standard.story = {
  name: "standard"
};

export const WithCustomSize = () => (
  <Box width={"400px"}>
    <TextArea rows={3} value={knobs.text("Text", "Some nice text.")} />
  </Box>
);

WithCustomSize.story = {
  name: "with custom size"
};

export const WithResize = () => (
  <TextArea resize={"both"} value={knobs.text("Text", "Some nice text.")} />
);

WithResize.story = {
  name: "with resize"
};

export const Readonly = () => (
  <TextArea readOnly value={knobs.text("Text", "Some nice text.")} />
);

Readonly.story = {
  name: "readonly"
};

export const Disabled = () => (
  <TextArea disabled value={knobs.text("Text", "Some nice text.")} />
);

Disabled.story = {
  name: "disabled"
};
