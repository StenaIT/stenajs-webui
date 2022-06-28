import cx from "classnames";
import * as React from "react";
import { MouseEventHandler } from "react";
import styles from "./Chip.module.css";
import { Icon } from "../icon/Icon";
import { getDataProps } from "@stenajs-webui/core";
import { stenaTimes } from "../../../icons/ui/Icons-ui";

export type ChipVariant = "primary" | "secondary";

export interface ChipProps {
  onClick?: () => void;
  onClickRemove?: () => void;
  label?: string;
  variant?: ChipVariant;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  onClickRemove,
  onClick,
  label,
  variant = "primary",
  className,
  ...rest
}) => {
  const onClickHandler: MouseEventHandler<HTMLSpanElement> = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    if (onClick) {
      onClick();
    }
  };
  return (
    <div
      className={cx(
        styles.chip,
        styles[variant],
        onClickRemove ? styles.removable : undefined,
        className
      )}
      {...getDataProps(rest)}
    >
      {onClick ? (
        <button
          onClick={onClickHandler}
          className={cx(styles.chipCell, styles.label)}
        >
          {label}
        </button>
      ) : (
        <div className={cx(styles.chipCell, styles.label)}>{label}</div>
      )}

      {onClickRemove && (
        <button
          className={cx(styles.chipCell, styles.close)}
          onClick={onClickRemove}
        >
          <Icon icon={stenaTimes} size={10} />
        </button>
      )}
    </div>
  );
};
