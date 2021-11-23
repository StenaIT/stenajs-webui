import { Column } from "@stenajs-webui/core";
import * as React from "react";

interface ModalFooterProps {
  sticky?: boolean;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  sticky,
  children,
}) => (
  <Column
    indent={2}
    spacing={2}
    background={"var(--swui-modal-content-bg-color)"}
    position={sticky ? "sticky" : undefined}
    bottom={sticky ? "calc(-1 * var(--swui-modal-padding))" : undefined}
    shadow={sticky ? "var(--swui-sticky-modal-footer-shadow)" : undefined}
  >
    {children}
  </Column>
);
