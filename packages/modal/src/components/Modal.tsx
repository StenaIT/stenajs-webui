import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { Row, SeparatorLine, Spacing } from "@stenajs-webui/core";
import { StandardButton } from "@stenajs-webui/elements";
import { createStandardButtonTheme } from "@stenajs-webui/theme";
import * as React from "react";
import { ReactNode } from "react";
import { BaseModal, BaseModalProps } from "./BaseModal";

export interface ModalProps extends BaseModalProps {
  title: ReactNode;
}

const closeButtonTheme = createStandardButtonTheme({ height: "32px" });

export const Modal: React.FC<ModalProps> = ({ title, children, ...props }) => (
  <BaseModal {...props}>
    <Row
      justifyContent={"space-between"}
      alignItems={"center"}
      spacing={1}
      indent={1}
    >
      {title}
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
