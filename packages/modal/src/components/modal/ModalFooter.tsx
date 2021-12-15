import { Column } from "@stenajs-webui/core";
import * as React from "react";
import cx from "classnames";
import styles from "./Modal.module.css";

interface ModalFooterProps {
  sticky: boolean;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  sticky,
  children,
}) => (
  <Column
    indent={2}
    spacing={2}
    className={cx(styles.footer, { [styles.stickyFooter]: sticky })}
  >
    {children}
  </Column>
);
