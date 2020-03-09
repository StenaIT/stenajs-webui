import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { Row } from "@stenajs-webui/core";
import * as React from "react";
import { PrimaryButton, PrimaryButtonProps } from "../buttons/PrimaryButton";
import styles from "./Chip.module.css";

export interface ChipProps extends PrimaryButtonProps {
  onClickRemove?: () => void;
}

export const Chip: React.FC<ChipProps> = ({
  onClickRemove,
  className,
  label,
  onClick,
  ...props
}) => {
  return (
    <Row className={styles.chip}>
      <PrimaryButton
        label={label}
        {...props}
        size={"small"}
        className={styles.label}
      />
      <PrimaryButton
        leftIcon={faTimes}
        size={"small"}
        className={styles.close}
      />
    </Row>
  );
};
