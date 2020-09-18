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

Standard.storyName = "standard";

export const WithCustomSize = () => (
  <Box width={"400px"}>
    <TextArea rows={3} value={knobs.text("Text", "Some nice text.")} />
  </Box>
);

WithCustomSize.storyName = "with custom size";

export const WithResize = () => (
  <TextArea resize={"both"} value={knobs.text("Text", "Some nice text.")} />
);

WithResize.storyName = "with resize";

export const Readonly = () => (
  <TextArea readOnly value={knobs.text("Text", "Some nice text.")} />
);

Readonly.storyName = "readonly";

export const Disabled = () => (
  <TextArea disabled value={knobs.text("Text", "Some nice text.")} />
);

Disabled.storyName = "disabled";
