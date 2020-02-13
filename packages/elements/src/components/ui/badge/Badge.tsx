import * as React from "react";
import { SmallerText } from "@stenajs-webui/core";
import styles from "./Badge.module.css";

export type BadgeType = "notification" | "warning" | "error";

export interface BadgeProps {
  label?: string | number;
  type?: BadgeType;
}

export const Badge: React.FC<BadgeProps> = React.memo(
  ({ label, type = "notification" }) => {
    const className = styles.badge + " " + styles[type];

    return (
      <div className={className}>
        <SmallerText
          color={"var(--swui-badge-text-color)"}
          className={styles.label}
        >
          {label}
        </SmallerText>
      </div>
    );
  }
);
