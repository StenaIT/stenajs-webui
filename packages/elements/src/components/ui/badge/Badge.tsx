import { SmallText } from "@stenajs-webui/core";
import * as React from "react";
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
        <SmallText color={"var(--swui-badge-text-color)"}>{label}</SmallText>
      </div>
    );
  }
);
