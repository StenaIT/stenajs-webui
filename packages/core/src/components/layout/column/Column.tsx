import * as React from "react";
import { forwardRef } from "react";
import { Box, BoxProps } from "../box/Box";

export const Column = forwardRef<HTMLDivElement, BoxProps>(function Column(
  props,
  ref
) {
  return <Box ref={ref} {...props} />;
});
