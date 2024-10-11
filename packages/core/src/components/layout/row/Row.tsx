import * as React from "react";
import { forwardRef } from "react";
import { Box, BoxProps } from "../box/Box";

export const Row = forwardRef<HTMLDivElement, BoxProps>(
  function Row(props, ref) {
    return <Box row ref={ref} {...props} />;
  },
);
