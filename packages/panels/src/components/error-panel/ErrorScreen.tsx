import { Box } from "@stenajs-webui/core";
import * as React from "react";
import { ErrorPanel, ErrorPanelProps } from "./ErrorPanel";

export const ErrorScreen: React.FC<ErrorPanelProps> = (props) => {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <ErrorPanel {...props} />
    </Box>
  );
};
