import { Column } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";

export interface WindowFooterProps {
  children?: ReactNode;
}

export const WindowFooter: React.FC<WindowFooterProps> = ({ children }) => (
  <Column indent={2} spacing={2}>
    {children}
  </Column>
);
