import * as React from "react";
import { Box, BoxProps } from "./Box";

export const Row: React.FC<BoxProps> = props => {
  return <Box row {...props} />;
};
