import { Box } from "@stenajs-webui/core";
import * as React from "react";
import { BaseModal, BaseModalProps } from "./BaseModal";
import cx from "classnames";
import styles from "./Modal.module.css";
import { ModalHeader2, ModalHeaderProps2 } from "./ModalHeader2";

export interface ModalProps
  extends BaseModalProps,
    Pick<ModalHeaderProps2, "draggable" | "closeButtonClassName"> {
  headerText?: string;
  header?: React.ReactNode;
  spacing?: number;
  indent?: number;
  draggable?: boolean;
  footer?: React.ReactNode;
  disableStickyFooter?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  header,
  headerText,
  children,
  spacing,
  indent,
  draggable = false,
  onRequestClose,
  footer,
  disableStickyFooter = false,
  ...props
}) => {
  const activeSpacing = typeof spacing === "number" ? spacing : 1;
  const activeIndent = typeof indent === "number" ? indent : 1;

  return (
    <BaseModal {...props} onRequestClose={onRequestClose} draggable={draggable}>
      {header}
      {!header && !!headerText && (
        <ModalHeader2
          onRequestClose={onRequestClose}
          draggable={draggable}
          text={headerText}
        />
      )}
      <Box spacing={activeSpacing} indent={activeIndent}>
        {children}
      </Box>
      {footer && (
        <Box
          className={cx(styles.footer, {
            [styles.stickyFooter]: !disableStickyFooter,
          })}
        >
          {footer}
        </Box>
      )}
    </BaseModal>
  );
};
