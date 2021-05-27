import { BoxProps, Column } from "@stenajs-webui/core";
import * as React from "react";

export interface CardProps extends Omit<BoxProps, "shadow"> {}

export const Card: React.FC<CardProps> = ({
  background = "white",
  ...boxProps
}) => {
  return <Column shadow={"box"} background={background} {...boxProps} />;
};
