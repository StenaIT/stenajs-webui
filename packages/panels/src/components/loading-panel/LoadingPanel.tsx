import { Space, StandardText } from "@stenajs-webui/core";
import { Spinner } from "@stenajs-webui/elements";
import * as React from "react";
import { Box } from "@stenajs-webui/core";

export interface LoadingPanelProps {
  text?: string;
}

export const LoadingPanel: React.FC<LoadingPanelProps> = ({
  text = "Loading..."
}) => {
  return (
    <Box alignItems={"center"}>
      <Spinner />
      <Space num={4} />
      <StandardText>{text}</StandardText>
    </Box>
  );
};
