import { Column } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";

export interface ModalFooterProps {
  children?: ReactNode;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => (
  <Column indent={2} spacing={2}>
    {children}
  </Column>
);
