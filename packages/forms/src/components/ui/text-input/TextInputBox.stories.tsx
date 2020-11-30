import * as React from "react";
import { Icon, stenaArrowRight } from "@stenajs-webui/elements";
import { Box, Space } from "@stenajs-webui/core";
import { TextInput } from "./TextInput";
import { TextInputBox } from "./TextInputBox";

export default {
  title: "forms/TextInput/TextInputBox",
  component: TextInputBox,
};

export const Standard = () => (
  <Box width={"250px"}>
    <TextInputBox>
      <TextInput hideBorder />
      <Icon
        icon={stenaArrowRight}
        size={12}
        color={"var(--lhds-color-ui-500)"}
      />
      <Space />
      <TextInput hideBorder />
    </TextInputBox>
  </Box>
);
