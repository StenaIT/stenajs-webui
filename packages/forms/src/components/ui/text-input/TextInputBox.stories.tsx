import * as React from "react";
import { Icon, stenaArrowRight } from "@stenajs-webui/elements";
import { Box, Space } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
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
        color={cssColor("--lhds-color-ui-500")}
      />
      <Space />
      <TextInput hideBorder />
    </TextInputBox>
  </Box>
);
