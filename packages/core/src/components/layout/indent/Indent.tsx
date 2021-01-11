import * as React from "react";
import { Box, BoxProps } from "../box/Box";
import { forwardRef } from "react";

export interface IndentProps extends BoxProps {
  num?: number | boolean;
}

export const Indent = forwardRef<HTMLDivElement, Omit<IndentProps, "ref">>(
  function Indent({ num = 1, ...props }, ref) {
    return <Box indent={num} ref={ref} {...props} />;
  }
);
