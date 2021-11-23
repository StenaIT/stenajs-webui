import { Box } from "@stenajs-webui/core";
import * as React from "react";
import { BaseModal, BaseModalProps } from "./BaseModal";
import { ModalHeader, ModalHeaderProps } from "./ModalHeader";

export interface ModalProps extends BaseModalProps, ModalHeaderProps {
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
  closeButtonClassName,
  footer,
  disableStickyFooter = false,
  ...props
}) => {
  const activeSpacing = typeof spacing === "number" ? spacing : 1;
  const activeIndent = typeof indent === "number" ? indent : 1;

  return (
    <BaseModal {...props} onRequestClose={onRequestClose} draggable={draggable}>
      <ModalHeader
        onRequestClose={onRequestClose}
        header={header}
        headerText={headerText}
        closeButtonClassName={closeButtonClassName}
      />
      <Box spacing={activeSpacing} indent={activeIndent}>
        {children}
      </Box>
      {footer && (
        <Box
          position={disableStickyFooter ? undefined : "sticky"}
          bottom={
            disableStickyFooter
              ? undefined
              : "calc(-1 * var(--swui-modal-padding))"
          }
          boxShadow={
            disableStickyFooter
              ? undefined
              : "var(--swui-sticky-modal-footer-shadow)"
          }
        >
          {footer}
        </Box>
      )}
    </BaseModal>
  );
};
