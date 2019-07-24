import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { Row, SeparatorLine, Spacing, StandardText } from "@stenajs-webui/core";
import { StandardButton } from "@stenajs-webui/elements";
import { createStandardButtonTheme } from "@stenajs-webui/theme";
import * as React from "react";
import { ReactNode } from "react";
import { BaseModal, BaseModalProps } from "./BaseModal";

export interface ModalProps extends BaseModalProps {
  header?: ReactNode;
  headerText?: string;
}

const closeButtonTheme = createStandardButtonTheme({ height: "32px" });

export const Modal: React.FC<ModalProps> = ({
  header,
  headerText,
  children,
  ...props
}) => (
  <BaseModal {...props}>
    <Row
      justifyContent={"space-between"}
      alignItems={"center"}
      spacing={1}
      indent={1}
    >
      {headerText && (
        <StandardText fontWeight={"bold"}>{headerText}</StandardText>
      )}
      {header}
      <StandardButton
        leftIcon={faTimes}
        width={"32px"}
        onClick={props.onRequestClose as any}
        buttonTheme={closeButtonTheme}
      />
    </Row>
    <SeparatorLine />
    <Spacing indent={1}>{children}</Spacing>
  </BaseModal>
);
