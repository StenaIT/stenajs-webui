import * as React from "react";
import cx from "classnames";
import styles from "./Tag.module.css";

interface Props {
  variant?: TagVariant;
  label?: string;
  size?: TagSize;
  className?: string;
}

export type TagVariant =
  | "info"
  | "error"
  | "warning"
  | "success"
  | "passive"
  | "turquoise";

export type TagSize = "normal" | "small";

export const Tag: React.FC<Props> = ({
  className,
  variant = "info",
  size = "normal",
  label,
}) => {
  return (
    <div className={cx(styles.tag, styles[variant], styles[size], className)}>
      {label}
    </div>
  );
};
