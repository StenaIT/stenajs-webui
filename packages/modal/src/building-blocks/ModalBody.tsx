import * as React from "react";
import { Box, BoxProps } from "@stenajs-webui/core";

export interface ModalBodyProps extends Omit<BoxProps, "indent" | "spacing"> {}

export const ModalBody: React.FC<ModalBodyProps> = ({ gap = 3, ...props }) => {
  return <Box indent={3} spacing={3} gap={gap} {...props} />;
};
