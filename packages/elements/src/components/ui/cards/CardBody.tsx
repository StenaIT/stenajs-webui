import { BoxProps, Column } from "@stenajs-webui/core";
import * as React from "react";

interface CardBodyProps extends Omit<BoxProps, "indent" | "spacing"> {}

export const CardBody: React.FC<CardBodyProps> = (props) => {
  return <Column indent={2} spacing={2} {...props} />;
};
