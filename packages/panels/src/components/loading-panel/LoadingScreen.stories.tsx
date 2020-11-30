import { Box } from "@stenajs-webui/core";
import * as React from "react";
import { LoadingScreen } from "./LoadingScreen";

export default {
  title: "panels/Loading/LoadingScreen",
  component: LoadingScreen,
};

export const Standard = () => (
  <Box height={"700px"}>
    <LoadingScreen />
  </Box>
);

export const WithText = () => (
  <Box height={"700px"}>
    <LoadingScreen text={"Loading your booking..."} />
  </Box>
);
