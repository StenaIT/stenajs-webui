import cx from "classnames";
import * as React from "react";
import { MouseEventHandler } from "react";
import styles from "./Chip.module.css";
import { Icon } from "../icon/Icon";
import { getDataProps } from "@stenajs-webui/core";
import { stenaTimesThick } from "../../../icons/generated/CommonIcons";

export type ChipVariant = "primary" | "secondary";

export interface ChipProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onClickRemove?: MouseEventHandler<HTMLButtonElement>;
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
  const onClickHandler: MouseEventHandler<HTMLButtonElement> = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    onClick?.(ev);
  };

  const onClickRemoveHandler: MouseEventHandler<HTMLButtonElement> = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    onClickRemove?.(ev);
  };

  const removableStyle = onClickRemove ? styles.removable : undefined;

  return (
    <div
      className={cx(styles.chip, styles[variant], removableStyle, className)}
      {...getDataProps(rest)}
    >
      {onClick ? (
        <button
          onClick={onClickHandler}
          className={cx(styles.chipCell, styles.label, removableStyle)}
        >
          {label}
        </button>
      ) : (
        <div className={cx(styles.chipCell, styles.label, removableStyle)}>
          {label}
        </div>
      )}

      {onClickRemove && (
        <button
          className={cx(styles.chipCell, styles.close)}
          onClick={onClickRemoveHandler}
        >
          <div className={styles.circle}>
            <Icon icon={stenaTimesThick} size={8} />
          </div>
        </button>
      )}
    </div>
  );
};
