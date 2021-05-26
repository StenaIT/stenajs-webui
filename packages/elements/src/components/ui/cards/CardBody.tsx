import { Column } from "@stenajs-webui/core";
import * as React from "react";

interface CardBodyProps {}

export const CardBody: React.FC<CardBodyProps> = ({ children }) => {
  return (
    <Column indent={2} spacing={2}>
      {children}
    </Column>
  );
};
