import { Space, StandardText } from "@stenajs-webui/core";
import { Progress } from "@stenajs-webui/elements";
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
      <Progress />
      <Space num={4} />
      <StandardText>{text}</StandardText>
    </Box>
  );
};
