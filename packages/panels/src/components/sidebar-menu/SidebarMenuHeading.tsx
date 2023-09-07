import { Box, Space, Text } from "@stenajs-webui/core";
import * as React from "react";

export interface SidebarMenuHeadingProps {
  label: string;
}

export const SidebarMenuHeading: React.FC<SidebarMenuHeadingProps> = ({
  label,
}) => {
  return (
    <Box height={"32px"} justifyContent={"center"}>
      <Space />
      <Text variant={"overline"} size={"smaller"}>
        {label}
      </Text>
    </Box>
  );
};
