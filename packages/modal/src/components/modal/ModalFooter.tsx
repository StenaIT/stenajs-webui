import { Column } from "@stenajs-webui/core";
import * as React from "react";

interface ModalFooterProps {
  disableSticky?: boolean;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  disableSticky,
  children,
}) => (
  <Column
    indent={2}
    spacing={2}
    background={"var(--swui-modal-content-bg-color)"}
    position={disableSticky ? undefined : "sticky"}
    bottom={disableSticky ? undefined : "calc(-1 * var(--swui-modal-padding))"}
    shadow={
      disableSticky ? undefined : "var(--swui-sticky-modal-footer-shadow)"
    }
  >
    {children}
  </Column>
);
