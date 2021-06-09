import { Box } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import { BaseModal, BaseModalProps } from "./BaseModal";
import { ModalHeader } from "./ModalHeader";

export interface ModalProps extends BaseModalProps {
  header?: ReactNode;
  headerText?: string;
  spacing?: number;
  indent?: number;
}

export const Modal: React.FC<ModalProps> = ({
  header,
  headerText,
  children,
  spacing,
  indent,
  ...props
}) => {
  const activeSpacing = typeof spacing === "number" ? spacing : 1;
  const activeIndent = typeof indent === "number" ? indent : 1;

  return (
    <BaseModal {...props}>
      <ModalHeader
        onRequestClose={props.onRequestClose}
        header={header}
        headerText={headerText}
        draggable={props.draggable}
      />
      <Box spacing={activeSpacing} indent={activeIndent}>
        {children}
      </Box>
    </BaseModal>
  );
};
