import * as React from "react";
import { Box, BoxProps } from "../box/Box";
import { forwardRef } from "react";

export const Column = forwardRef<HTMLDivElement, Omit<BoxProps, "ref">>(
  function Column(props, ref) {
    return <Box ref={ref} {...props} />;
  }
);
