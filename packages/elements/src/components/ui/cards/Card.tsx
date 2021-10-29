import { BoxProps, Column } from "@stenajs-webui/core";
import * as React from "react";

export interface CardProps extends BoxProps {}

export const Card: React.FC<CardProps> = ({
  background = "white",
  shadow = "elevationS",
  ...boxProps
}) => <Column shadow={shadow} background={background} {...boxProps} />;
