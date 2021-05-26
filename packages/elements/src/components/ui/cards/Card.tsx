import { Column } from "@stenajs-webui/core";
import * as React from "react";

export interface CardProps {}

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <Column shadow={"box"} background={"white"}>
      {children}
    </Column>
  );
};
