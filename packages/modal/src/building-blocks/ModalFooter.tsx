import { Row } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import styles from "./ModalFooter.module.css";
import cx from "classnames";

export interface ModalFooterProps {
  children: ReactNode;
  sticky?: boolean;
  zIndex?: number;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  sticky,
  zIndex = 4,
}) => {
  return (
    <Row
      className={cx(styles.modalFooter, sticky && styles.sticky)}
      shadow={"var(--swui-sticky-footer-shadow)"}
      zIndex={zIndex}
    >
      {children}
    </Row>
  );
};
