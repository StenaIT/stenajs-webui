import * as React from "react";
import { getDataProps, Text } from "@stenajs-webui/core";
import styles from "./Badge.module.css";
import cx from "classnames";

export type BadgeVariant = "info" | "warning" | "error";

export interface BadgeProps {
  label?: string | number;
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "info",
  ...rest
}) => {
  return (
    <div className={cx(styles.badge, styles[variant])} {...getDataProps(rest)}>
      <Text
        size={"smaller"}
        color={"var(--swui-badge-text-color)"}
        className={styles.label}
      >
        {label}
      </Text>
    </div>
  );
};
