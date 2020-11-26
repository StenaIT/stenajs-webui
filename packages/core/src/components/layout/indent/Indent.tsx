import * as React from "react";
import { Box, BoxProps } from "../box/Box";

export interface IndentProps extends BoxProps {
  num?: number | boolean;
}

export const Indent: React.FC<IndentProps> = ({ num = 1, ...props }) => {
  return <Box indent={num} {...props} />;
};
