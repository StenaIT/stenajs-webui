import * as React from "react";
import { Box, BoxProps } from "@stenajs-webui/core";

export const RouteLegList: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box gap={2} {...props}>
      {children}
    </Box>
  );
};
