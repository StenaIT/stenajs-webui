import { faExclamation } from "@fortawesome/free-solid-svg-icons/faExclamation";
import { Box, Space, Text } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import * as React from "react";
import { defaultErrorPanelTheme, ErrorPanelTheme } from "./ErrorPanelTheme";

export interface ErrorPanelProps {
  text?: string;
  theme?: ErrorPanelTheme;
}

export const ErrorPanel: React.FC<ErrorPanelProps> = ({
  text = "Something unexpected happened.",
  theme = defaultErrorPanelTheme,
}) => {
  return (
    <Box
      width={theme.width}
      height={theme.height}
      justifyContent={"center"}
      alignItems={"center"}
      background={theme.backgroundColor}
    >
      <Icon icon={faExclamation} size={42} />
      <Space num={4} />
      <Text>{text}</Text>
    </Box>
  );
};
