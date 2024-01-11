import { Column } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import {
  NotificationHeader,
  NotificationHeaderProps,
} from "./NotificationHeader";
import styles from "./Notification.module.css";
import cx from "classnames";

export type NotificationVariant = "standard" | "danger";

export interface NotificationProps extends NotificationHeaderProps {
  children?: ReactNode;
}

export const Notification: React.FC<NotificationProps> = ({
  variant = "standard",
  children,
  unread,
  ...headerProps
}) => (
  <div
    className={cx(
      styles.notification,
      styles[variant],
      unread && styles.unread
    )}
  >
    <NotificationHeader {...headerProps} unread={unread} variant={variant} />
    {children && <Column className={styles.body}>{children}</Column>}
  </div>
);
