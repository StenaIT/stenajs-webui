import { Column, Row } from "@stenajs-webui/core";
import * as React from "react";
import styles from "./UpDownButtons.module.css";
import {
  stenaAngleDown,
  stenaAngleUp,
} from "../../../icons/generated/ArrowIcons";
import { Icon } from "../icon/Icon";

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
        <Icon
          icon={stenaAngleUp}
          size={16}
          color={
            disabled ? "var(--swui-textinput-text-color-disabled)" : iconColor
          }
        />
      </Row>
    </button>
    <button onClick={onClickDown} className={styles.button} disabled={disabled}>
      <Row justifyContent={"center"} alignItems={"center"}>
        <Icon
          icon={stenaAngleDown}
          size={16}
          color={
            disabled ? "var(--swui-textinput-text-color-disabled)" : iconColor
          }
        />
      </Row>
    </button>
  </Column>
);
