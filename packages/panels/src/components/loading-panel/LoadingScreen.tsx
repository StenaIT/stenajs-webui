import { Box } from "@stenajs-webui/core";
import * as React from "react";
import { LoadingPanel, LoadingPanelProps } from "./LoadingPanel";

export const LoadingScreen: React.FC<LoadingPanelProps> = (props) => {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <LoadingPanel {...props} />
    </Box>
  );
};
