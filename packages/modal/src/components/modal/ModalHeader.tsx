import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { FlatButton, Icon } from "@stenajs-webui/elements";
import * as React from "react";
import { ReactNode } from "react";
import { BaseModalProps, DRAGGABLE_HANDLE_CLASSNAME } from "./BaseModal";
import { Box, Column, Row, Txt } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

interface Props {
  onRequestClose?: () => void;
  header?: ReactNode;
  headerText?: string;
  draggable: BaseModalProps["draggable"];
  draggableHandle?: boolean;
  draggableBar?: boolean;
}

export const ModalHeader: React.FC<Props> = ({
  onRequestClose,
  header,
  headerText,
  draggable,
  draggableHandle,
  draggableBar,
}) => {
  return (
    <Column borderBottom={"1px solid var(--swui-modal-header-border-color)"}>
      {draggable && draggableBar && (
        <Box
          className={DRAGGABLE_HANDLE_CLASSNAME}
          width={"100%"}
          spacing={0.5}
          background={cssColor("--lhds-color-ui-300")}
        />
      )}
      <Row spacing indent>
        {draggable && draggableHandle && (
          <Icon icon={faGripVertical} className={DRAGGABLE_HANDLE_CLASSNAME} />
        )}
        <Row spacing indent={2} flex={1} alignItems={"center"}>
          {headerText && <Txt size={"large"}>{headerText}</Txt>}
          {header}
        </Row>
        <Box alignSelf={"flex-start"}>
          <FlatButton onClick={onRequestClose} leftIcon={faTimes} />
        </Box>
      </Row>
    </Column>
  );
};
