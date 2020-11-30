import * as React from "react";
import { SmallerText } from "@stenajs-webui/core";
import styles from "./Badge.module.css";
import cx from "classnames";

export type BadgeVariant = "info" | "warning" | "error";

export interface BadgeProps {
  label?: string | number;
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = "info" }) => {
  return (
    <div className={cx(styles.badge, styles[variant])}>
      <SmallerText
        color={"var(--swui-badge-text-color)"}
        className={styles.label}
      >
        {label}
      </SmallerText>
    </div>
  );
};
