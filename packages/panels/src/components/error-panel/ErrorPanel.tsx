import { Box } from "@stenajs-webui/core";
import { Banner } from "@stenajs-webui/elements";
import * as React from "react";

export interface ErrorPanelProps {
  text?: string;
}

export const ErrorPanel: React.FC<ErrorPanelProps> = ({
  text = "Something unexpected happened.",
}) => {
  return (
    <Box justifyContent={"center"} alignItems={"center"}>
      <Banner variant={"error"} headerText={text} />
    </Box>
  );
};
