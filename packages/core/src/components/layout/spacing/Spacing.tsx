import * as React from "react";
import { Box, BoxProps } from "../box/Box";
import { forwardRef } from "react";

export interface SpacingProps extends BoxProps {
  num?: number | boolean;
}

export const Spacing = forwardRef<HTMLDivElement, SpacingProps>(
  function Spacing({ num = 1, ...props }, ref) {
    return <Box spacing={num} ref={ref} {...props} />;
  }
);
