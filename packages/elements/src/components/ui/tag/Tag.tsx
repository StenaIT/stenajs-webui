import { getDataProps } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import styles from "./Tag.module.css";

export interface TagProps {
  variant?: TagVariant;
  label?: string;
  size?: TagSize;
  className?: string;
  icon?: React.ReactNode;
}

export type TagVariant =
  | "info"
  | "error"
  | "warning"
  | "success"
  | "passive"
  | "turquoise";

export type TagSize = "medium" | "small";

export const Tag: React.FC<TagProps> = ({
  className,
  variant = "info",
  size = "medium",
  label,
  icon,
  ...rest
}) => {
  return (
    <div
      className={cx(styles.tag, styles[variant], styles[size], className)}
      {...getDataProps(rest)}
    >
      <>
        {icon}
        {label}
      </>
    </div>
  );
};
