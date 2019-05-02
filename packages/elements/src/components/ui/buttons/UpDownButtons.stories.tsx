import { Box } from "@stenajs-webui/core";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { UpDownButtons } from "./UpDownButtons";

storiesOf("elements/Buttons/UpDownButtons", module)
  .addDecorator(withInfo())
  .add("standard", () => (
    <Box display={"inline-block"}>
      <UpDownButtons />
    </Box>
  ));
