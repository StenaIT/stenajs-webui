import * as React from "react";
import { Box, BoxProps } from "../box/Box";

export const Row: React.FC<BoxProps> = props => {
  return <Box row {...props} />;
};
