import { Box, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { useRailContext } from "../rail/RailContext";

export interface SidebarMenuHeadingProps {
  label: string;
}

export const SidebarMenuHeading: React.FC<SidebarMenuHeadingProps> = ({
  label,
}) => {
  const isRail = useRailContext();

  if (isRail) {
    return null;
  }

  return (
    <Box height={"32px"} justifyContent={"center"} indent={1}>
      <Space />
      <Text variant={"overline"} size={"smaller"}>
        {label}
      </Text>
    </Box>
  );
};
