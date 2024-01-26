import { CloseButton } from "@stenajs-webui/elements";
import * as React from "react";
import { ReactNode } from "react";
import {
  DRAGGABLE_CANCEL_CLASSNAME,
  DRAGGABLE_HANDLE_CLASSNAME,
} from "./BaseWindow";
import { Box, Row, Txt } from "@stenajs-webui/core";

export interface WindowHeaderProps {
  onRequestClose?: () => void;
  header?: ReactNode;
  headerText?: string;
  closeButtonClassName?: string;
}

export const WindowHeader: React.FC<WindowHeaderProps> = ({
  onRequestClose,
  header,
  headerText,
  closeButtonClassName,
}) => {
  return (
    <Row
      spacing={2}
      indent={2}
      borderBottom={"1px solid var(--lhds-color-ui-300)"}
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
        <CloseButton
          className={closeButtonClassName}
          onClick={onRequestClose}
        />
      </Box>
    </Row>
  );
};
