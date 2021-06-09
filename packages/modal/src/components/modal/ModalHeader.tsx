import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { FlatButton, Icon } from "@stenajs-webui/elements";
import * as React from "react";
import { ReactNode } from "react";
import { BaseModalProps, DRAGGABLE_HANDLE_CLASSNAME } from "./BaseModal";
import { Box, Row, Txt } from "@stenajs-webui/core";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

interface Props {
  onRequestClose?: () => void;
  header?: ReactNode;
  headerText?: string;
  draggable: BaseModalProps["draggable"];
}

export const ModalHeader: React.FC<Props> = ({
  onRequestClose,
  header,
  headerText,
  draggable,
}) => {
  return (
    <Row
      spacing={2}
      indent={2}
      borderBottom={"1px solid var(--swui-modal-header-border-color)"}
    >
      {draggable && (
        <Box
          className={DRAGGABLE_HANDLE_CLASSNAME}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Icon icon={faGripVertical} />
        </Box>
      )}
      <Row indent flex={1} alignItems={"center"}>
        {headerText && <Txt size={"large"}>{headerText}</Txt>}
        {header}
      </Row>
      <Box alignSelf={"flex-start"}>
        <FlatButton onClick={onRequestClose} leftIcon={faTimes} />
      </Box>
    </Row>
  );
};
