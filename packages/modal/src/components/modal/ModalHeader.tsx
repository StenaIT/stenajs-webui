import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { FlatButton, stenaTimes } from "@stenajs-webui/elements";
import * as React from "react";
import { ReactNode } from "react";
import {
  DRAGGABLE_CANCEL_CLASSNAME,
  DRAGGABLE_HANDLE_CLASSNAME,
} from "./BaseModal";
import { Box, Row, Txt } from "@stenajs-webui/core";

export interface ModalHeaderProps {
  onRequestClose?: () => void;
  header?: ReactNode;
  headerText?: string;
  closeButtonClassName?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  onRequestClose,
  header,
  headerText,
  closeButtonClassName,
}) => {
  return (
    <Row
      spacing={2}
      indent={2}
      borderBottom={"1px solid var(--swui-modal-header-border-color)"}
      className={DRAGGABLE_HANDLE_CLASSNAME}
    >
      <Row flex={1} indent alignItems={"center"}>
        {headerText && (
          <Txt className={DRAGGABLE_CANCEL_CLASSNAME} size={"large"}>
            {headerText}
          </Txt>
        )}
        {header}
      </Row>
      <Box alignSelf={"flex-start"}>
        <FlatButton
          className={closeButtonClassName}
          onClick={onRequestClose}
          aria-label={"Close"}
          leftIcon={stenaTimes}
        />
      </Box>
    </Row>
  );
};
