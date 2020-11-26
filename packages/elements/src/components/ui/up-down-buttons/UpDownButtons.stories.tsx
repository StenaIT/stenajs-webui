import * as React from "react";
import { Box } from "@stenajs-webui/core";
import { action } from "@storybook/addon-actions";
import { UpDownButtons } from "./UpDownButtons";

export default {
  title: "elements/Buttons/UpDownButtons",
};

export const Standard = () => (
  <Box display={"inline-block"}>
    <UpDownButtons
      onClickUp={action("Up clicked")}
      onClickDown={action("Down clicked")}
    />
  </Box>
);
