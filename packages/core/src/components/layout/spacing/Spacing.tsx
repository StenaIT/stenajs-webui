import * as React from "react";
import { forwardRef } from "react";
import { Box, BoxProps } from "../box/Box";
import { ResponsiveValue, TLengthStyledSystem } from "styled-system";

export interface SpacingProps extends BoxProps {
  num?: ResponsiveValue<boolean | TLengthStyledSystem>;
}

export const Spacing = forwardRef<HTMLDivElement, SpacingProps>(
  function Spacing({ num = 1, ...props }, ref) {
    return <Box spacing={num} ref={ref} {...props} />;
  },
);
