import { BoxProps, Column } from "@stenajs-webui/core";
import * as React from "react";

interface ModalFooterProps extends Omit<BoxProps, "indent" | "spacing"> {}

export const ModalFooter: React.FC<ModalFooterProps> = (props) => (
  <Column
    indent={2}
    spacing={2}
    background={"var(--swui-modal-content-bg-color)"}
    {...props}
  />
);
