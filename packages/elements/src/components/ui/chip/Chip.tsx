import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import * as React from "react";
import { PrimaryButton, PrimaryButtonProps } from "../buttons/PrimaryButton";
import styles from "./Chip.module.css";

export interface ChipProps extends PrimaryButtonProps {
  onRemove?: () => void;
}

export const Chip: React.FC<ChipProps> = ({
  onRemove,
  className,
  label,
  onClick,
  ...props
}) => {
  return (
    <div className={styles.chip}>
      <PrimaryButton
        label={label}
        {...props}
        size={"small"}
        className={styles.label}
        onClick={onClick}
      />
      {onRemove && (
        <PrimaryButton
          leftIcon={faTimes}
          size={"small"}
          className={styles.close}
          onClick={onRemove}
        />
      )}
    </div>
  );
};
