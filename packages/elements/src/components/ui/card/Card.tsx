import { BoxProps, Column } from "@stenajs-webui/core";
import * as React from "react";

export interface CardProps extends Omit<BoxProps, "shadow"> {}

export const Card: React.FC<CardProps> = ({
  background = "white",
  ...boxProps
}) => (
  <Column
    shadow={"box"}
    background={background}
    borderRadius={"var(--swui-border-radius-card)"}
    {...boxProps}
  />
);
