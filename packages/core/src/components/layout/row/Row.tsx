import * as React from "react";
import { Box, BoxProps } from "../box/Box";
import { forwardRef } from "react";

export const Row = forwardRef<HTMLDivElement, Omit<BoxProps, "ref">>(
  function Row(props, ref) {
    return <Box row ref={ref} {...props} />;
  }
);
