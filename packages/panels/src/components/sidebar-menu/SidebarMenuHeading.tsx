import { Box, Space, Text, TextProps } from "@stenajs-webui/core";
import * as React from "react";
import { CollapsibleSimpleContentProps } from "../collapsible/CollapsibleContent";

export interface SidebarMenuHeadingProps
  extends Pick<CollapsibleSimpleContentProps, "contentLeft" | "contentRight">,
    TextProps {
  label?: string;
}

export const SidebarMenuHeading: React.FC<SidebarMenuHeadingProps> = ({
  className,
  label,
  contentLeft,
  contentRight,
  ...textProps
}) => {
  return (
    <Box height={"32px"} justifyContent={"center"} indent={2}>
      <Space />
      <Text variant={"overline"} size={"smaller"} {...textProps}>
        {label}
      </Text>
    </Box>
  );
};
