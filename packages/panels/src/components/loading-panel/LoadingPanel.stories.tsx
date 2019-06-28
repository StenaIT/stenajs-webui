import { Box } from "@stenajs-webui/core";
import { LoadingPanel, LoadingScreen } from "@stenajs-webui/panels";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("panels/Loading/LoadingPanel", module)
  .add("standard", () => <LoadingPanel />)
  .add("with text", () => <LoadingPanel text={"Loading your booking..."} />);

storiesOf("panels/Loading/LoadingScreen", module)
  .add("standard", () => (
    <Box height={"700px"}>
      <LoadingScreen />
    </Box>
  ))
  .add("with text", () => (
    <Box height={"700px"}>
      <LoadingScreen text={"Loading your booking..."} />
    </Box>
  ));
