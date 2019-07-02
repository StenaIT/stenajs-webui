import * as React from "react";
import { Box, BoxProps } from "../box/Box";

interface RelativeProps extends BoxProps {
  num?: number | boolean;
}

export const Relative: React.FC<RelativeProps> = ({ num, ...props }) => {
  return <Box position={"relative"} {...props} />;
};
