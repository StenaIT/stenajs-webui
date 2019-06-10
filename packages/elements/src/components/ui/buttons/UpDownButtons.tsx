import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons/faCaretUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Clickable, Column, Row } from "@stenajs-webui/core";
import * as React from "react";

export interface UpDownButtonsProps {
  onClickUp?: () => void;
  onClickDown?: () => void;
  buttonHeight?: string;
  iconColor?: string;
}

export const UpDownButtons: React.FC<UpDownButtonsProps> = ({
  onClickDown,
  onClickUp,
  buttonHeight,
  iconColor
}) => (
  <Column>
    <Clickable onClick={onClickUp}>
      <Row
        height={buttonHeight}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box indent={0.75}>
          <FontAwesomeIcon icon={faCaretUp} size={"sm"} color={iconColor} />
        </Box>
      </Row>
    </Clickable>
    <Clickable onClick={onClickDown}>
      <Row
        height={buttonHeight}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box indent={0.75}>
          <FontAwesomeIcon icon={faCaretDown} size={"sm"} color={iconColor} />
        </Box>
      </Row>
    </Clickable>
  </Column>
);
