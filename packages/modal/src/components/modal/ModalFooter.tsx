import { BoxProps, Column } from "@stenajs-webui/core";
import * as React from "react";

interface ModalFooterProps extends Omit<BoxProps, "indent" | "spacing"> {
  sticky?: boolean;
}

export const ModalFooter: React.FC<ModalFooterProps> = (props) => (
  <Column
    indent={2}
    spacing={2}
    background={"var(--swui-modal-content-bg-color)"}
    position={props.sticky ? undefined : "sticky"}
    bottom={props.sticky ? undefined : "calc(-1 * var(--swui-modal-padding))"}
    shadow={props.sticky ? undefined : "var(--swui-sticky-modal-footer-shadow)"}
    {...props}
  />
);
