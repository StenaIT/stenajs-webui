import { Box, BoxProps } from "@stenajs-webui/core";
import * as React from "react";
import {
  CARD_WRAPPER_GAP,
  CARD_WRAPPER_INDENT,
  CARD_WRAPPER_SPACING,
} from "./Card";

export interface CardWrapperProps
  extends Omit<BoxProps, "indent" | "spacing"> {}

export const CardWrapper: React.FC<CardWrapperProps> = ({ ...props }) => (
  <Box
    indent={CARD_WRAPPER_INDENT}
    spacing={CARD_WRAPPER_SPACING}
    gap={CARD_WRAPPER_GAP}
    {...props}
  />
);
