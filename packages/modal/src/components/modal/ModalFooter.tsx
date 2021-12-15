import { Column } from "@stenajs-webui/core";
import * as React from "react";

export const ModalFooter: React.FC = ({ children }) => (
  <Column indent={2} spacing={2}>
    {children}
  </Column>
);
