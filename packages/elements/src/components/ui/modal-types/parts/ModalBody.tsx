import * as React from "react";
import { Box, BoxProps } from "@stenajs-webui/core";

export interface ModalBodyProps extends Omit<BoxProps, "indent" | "spacing"> {}

export const ModalBody: React.FC<ModalBodyProps> = ({ gap = 2, ...props }) => {
  return <Box indent={4} spacing={4} gap={gap} {...props} />;
};
