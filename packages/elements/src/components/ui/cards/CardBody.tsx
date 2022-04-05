import { BoxProps, Column } from "@stenajs-webui/core";
import * as React from "react";

interface CardBodyProps extends Omit<BoxProps, "indent" | "spacing"> {}

export const CardBody: React.FC<CardBodyProps> = (props) => (
  <Column indent={3} spacing={3} {...props} />
);
