import { Box } from "@stenajs-webui/core";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { UpDownButtons } from "./UpDownButtons";

storiesOf("elements/Buttons/UpDownButtons", module)
  .add("standard", () => (
    <Box display={"inline-block"}>
      <UpDownButtons
        onClickUp={action("Up clicked")}
        onClickDown={action("Down clicked")}
      />
    </Box>
  ));
