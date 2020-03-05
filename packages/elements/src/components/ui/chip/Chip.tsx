import * as React from "react";
import { HTMLAttributes } from "react";
import styles from "./Chip.module.css";
import { Clickable } from "@stenajs-webui/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { Icon } from "../icon/Icon";
import cx from "classnames";

export interface ChipProps {
  label: string;
  onClickLabel?: () => void;
  onClickRemove?: () => void;
  variant?: string;
}

export const Chip: React.FC<ChipProps & HTMLAttributes<HTMLDivElement>> = ({
  label,
  onClickLabel,
  onClickRemove,
  className,
  variant = "default",
  ...props
}) => {
  return (
    <div className={cx(styles.chip, styles[variant])} {...props}>
      <Clickable onClick={onClickLabel} className={styles.label}>
        {label}
      </Clickable>
      {onClickRemove && (
        <Clickable className={styles.close} onClick={onClickRemove}>
          <Icon icon={faTimes} size={8} />
        </Clickable>
      )}
    </div>
  );
};
