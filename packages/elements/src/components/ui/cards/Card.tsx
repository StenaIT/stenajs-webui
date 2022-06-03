import { BoxProps, Column } from "@stenajs-webui/core";
import * as React from "react";

export interface CardProps extends Omit<BoxProps, "shadow"> {}

export const CARD_WRAPPER_INDENT = [0, 2, 3];
export const CARD_WRAPPER_SPACING = [0, 2, 3];
export const CARD_WRAPPER_GAP = [1, 2, 2];
export const CARD_INDENT = [1, 2, 3];
export const CARD_SPACING = [1, 2, 3];
export const CARD_SPACING_COMPACT = [1, 1];

export const Card: React.FC<CardProps> = ({
  background = "white",
  ...boxProps
}) => <Column shadow={"box"} background={background} {...boxProps} />;
