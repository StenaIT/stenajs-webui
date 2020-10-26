import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons/faCaretUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Column, Row } from "@stenajs-webui/core";
import * as React from "react";
import styles from "./UpDownButtons.module.css";

export interface UpDownButtonsProps {
  onClickUp?: () => void;
  onClickDown?: () => void;
  iconColor?: string;
  disabled?: boolean;
}

export const UpDownButtons: React.FC<UpDownButtonsProps> = ({
  onClickDown,
  onClickUp,
  iconColor,
  disabled,
}) => (
  <Column className={styles.upDownButtons}>
    <button onClick={onClickUp} className={styles.button} disabled={disabled}>
      <Row justifyContent={"center"} alignItems={"center"}>
        <FontAwesomeIcon
          icon={faCaretUp}
          size={"sm"}
          color={
            disabled ? "var(--swui-textinput-text-color-disabled)" : iconColor
          }
        />
      </Row>
    </button>
    <button onClick={onClickDown} className={styles.button} disabled={disabled}>
      <Row justifyContent={"center"} alignItems={"center"}>
        <FontAwesomeIcon
          icon={faCaretDown}
          size={"sm"}
          color={
            disabled ? "var(--swui-textinput-text-color-disabled)" : iconColor
          }
        />
      </Row>
    </button>
  </Column>
);
