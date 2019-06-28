import { Box } from "@stenajs-webui/core";
import { ErrorPanel, ErrorScreen } from "@stenajs-webui/panels";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("panels/Error/ErrorPanel", module)
  .add("standard", () => <ErrorPanel />)
  .add("with text", () => <ErrorPanel text={"Oups, I did it again!"} />);

storiesOf("panels/Error/ErrorScreen", module)
  .add("standard", () => (
    <Box height={"700px"}>
      <ErrorScreen />
    </Box>
  ))
  .add("with text", () => (
    <Box height={"700px"}>
      <ErrorScreen text={"Oups, I did it again!"} />
    </Box>
  ));
