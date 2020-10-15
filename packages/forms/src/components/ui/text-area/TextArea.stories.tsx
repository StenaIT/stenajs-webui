import { Box } from "@stenajs-webui/core";
import * as knobs from "@storybook/addon-knobs";
import * as React from "react";
import { TextArea } from "@stenajs-webui/forms";

export default {
  title: "forms/TextInput/TextArea",
};

export const Standard = () => (
  <TextArea value={knobs.text("Text", "Some nice text.")} />
);

export const WithCustomSize = () => (
  <Box width={"400px"}>
    <TextArea rows={3} value={knobs.text("Text", "Some nice text.")} />
  </Box>
);

export const WithResize = () => (
  <TextArea resize={"both"} value={knobs.text("Text", "Some nice text.")} />
);

export const Readonly = () => (
  <TextArea readOnly value={knobs.text("Text", "Some nice text.")} />
);

export const Disabled = () => (
  <TextArea disabled value={knobs.text("Text", "Some nice text.")} />
);
