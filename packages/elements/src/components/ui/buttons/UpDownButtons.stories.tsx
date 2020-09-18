import { Box } from "@stenajs-webui/core";
import { UpDownButtons } from "@stenajs-webui/elements";
import { action } from "@storybook/addon-actions";
import * as React from "react";

export default {
  title: "elements/Buttons/UpDownButtons"
};

export const Standard = () => (
  <Box display={"inline-block"}>
    <UpDownButtons
      onClickUp={action("Up clicked")}
      onClickDown={action("Down clicked")}
    />
  </Box>
);

Standard.story = {
  name: "standard"
};
