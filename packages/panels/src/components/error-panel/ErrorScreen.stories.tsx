import { Box } from "@stenajs-webui/core";
import * as React from "react";
import { ErrorScreen } from "./ErrorScreen";

export default {
  title: "panels/Error/ErrorScreen",
  component: ErrorScreen,
};

export const Standard = () => (
  <Box height={"700px"}>
    <ErrorScreen />
  </Box>
);

export const WithText = () => (
  <Box height={"700px"}>
    <ErrorScreen text={"Oups, I did it again!"} />
  </Box>
);
