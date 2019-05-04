import * as React from "react";
import { Box, BoxProps } from "../box/Box";

interface IndentProps extends BoxProps {
  num?: number | boolean;
}

export const Indent: React.FC<IndentProps> = ({ num, ...props }) => {
  return <Box indent={num} {...props} />;
};
