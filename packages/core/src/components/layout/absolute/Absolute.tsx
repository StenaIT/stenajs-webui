import * as React from "react";
import { Box, BoxProps } from "../box/Box";

interface AbsoluteProps extends BoxProps {
  num?: number | boolean;
}

export const Absolute: React.FC<AbsoluteProps> = ({ num, ...props }) => {
  return <Box position={'absolute'} {...props} />;
};
