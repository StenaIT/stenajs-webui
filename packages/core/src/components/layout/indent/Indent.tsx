import * as React from "react";
import { forwardRef } from "react";
import { Box, BoxProps } from "../box/Box";
import { ResponsiveValue, TLengthStyledSystem } from "styled-system";

export interface IndentProps extends BoxProps {
  num?: ResponsiveValue<boolean | TLengthStyledSystem>;
}

export const Indent = forwardRef<HTMLDivElement, IndentProps>(function Indent(
  { num = 1, ...props },
  ref
) {
  return <Box indent={num} ref={ref} {...props} />;
});
