import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Clickable, Column, Row } from "@stenajs-webui/core";
import * as React from "react";
import { faAngleDown } from "@fortawesome/pro-light-svg-icons/faAngleDown";
import { faAngleUp } from "@fortawesome/pro-light-svg-icons/faAngleUp";

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
          <FontAwesomeIcon icon={faAngleUp} size={"sm"} color={iconColor} />
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
          <FontAwesomeIcon icon={faAngleDown} size={"sm"} color={iconColor} />
        </Box>
      </Row>
    </Clickable>
  </Column>
);
