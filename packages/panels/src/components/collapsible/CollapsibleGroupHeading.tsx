import { Box, Text } from "@stenajs-webui/core";
import * as React from "react";

export interface CollapsibleGroupHeadingProps {
  children: string;
}

export const CollapsibleGroupHeading: React.FC<
  CollapsibleGroupHeadingProps
> = ({ children }) => (
  <Box spacing indent>
    <Text variant={"overline"} size={"smaller"}>
      {children}
    </Text>
  </Box>
);
