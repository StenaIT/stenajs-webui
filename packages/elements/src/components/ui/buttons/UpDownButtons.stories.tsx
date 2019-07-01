import { Box } from "@stenajs-webui/core";
import { UpDownButtons } from "@stenajs-webui/elements";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("elements/Buttons/UpDownButtons", module).add("standard", () => (
  <Box display={"inline-block"}>
    <UpDownButtons
      onClickUp={action("Up clicked")}
      onClickDown={action("Down clicked")}
    />
  </Box>
));
