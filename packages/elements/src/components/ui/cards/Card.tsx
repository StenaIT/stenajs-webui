import { BoxProps, Column } from "@stenajs-webui/core";
import * as React from "react";

export interface CardProps extends Omit<BoxProps, "shadow"> {}

export const Card: React.FC<CardProps> = ({
  background = "white",
  elevation = "small",
  ...boxProps
}) => <Column elevation={elevation} background={background} {...boxProps} />;
