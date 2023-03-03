import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDataProps } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { CSSProperties } from "react";
import styles from "./Tag.module.css";

export interface TagProps {
  variant?: TagVariant;
  label?: string;
  size?: TagSize;
  className?: string;
  style?: CSSProperties;
  icon?: IconDefinition;
}

export type TagVariant = "info" | "error" | "warning" | "success" | "passive";

export type TagSize = "medium" | "small";

export const Tag: React.FC<TagProps> = ({
  className,
  style,
  variant = "info",
  size = "medium",
  label,
  icon,
  ...rest
}) => {
  return (
    <div
      className={cx(styles.tag, styles[variant], styles[size], className)}
      style={style}
      {...getDataProps(rest)}
    >
      {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
      <span className={styles.label}>{label}</span>
    </div>
  );
};
