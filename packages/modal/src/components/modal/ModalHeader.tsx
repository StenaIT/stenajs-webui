import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { FlatButton, Icon } from "@stenajs-webui/elements";
import * as React from "react";
import { ReactNode } from "react";
import { BaseModalProps, DRAGGABLE_HANDLE_CLASSNAME } from "./BaseModal";
import { Box, Row, Txt } from "@stenajs-webui/core";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ModalHeaderProps extends Pick<BaseModalProps, "draggable"> {
  onRequestClose?: () => void;
  header?: ReactNode;
  headerText?: string;
  handleIcon?: IconDefinition;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  onRequestClose,
  header,
  headerText,
  draggable,
  handleIcon = faGripVertical,
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
          <Icon icon={handleIcon} />
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
