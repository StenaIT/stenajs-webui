import { Box } from "@stenajs-webui/core";
import { LoadingPanel, LoadingScreen } from "@stenajs-webui/panels";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("panels/Loading/LoadingPanel", module)
  .add("standard", () => (
    <div style={{ display: "inline-block" }}>
      <LoadingPanel />
    </div>
  ))
  .add("with text", () => (
    <div style={{ display: "inline-block" }}>
      <LoadingPanel text={"Loading your booking..."} />
    </div>
  ));

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
