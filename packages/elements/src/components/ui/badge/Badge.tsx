import * as React from "react";
import { Text } from "@stenajs-webui/core";
import styles from "./Badge.module.css";
import cx from "classnames";

export type BadgeVariant = "info" | "warning" | "error";

export interface BadgeProps {
  label?: string | number;
  variant?: BadgeVariant;
  /** Sets the data-testid attribute of the DOM element. */
  testId?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "info",
  testId,
}) => {
  return (
    <div className={cx(styles.badge, styles[variant])} data-testid={testId}>
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
