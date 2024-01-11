import * as React from "react";
import { ReactNode } from "react";
import styles from "./NotificationList.module.css";

export interface NotificationListProps {
  children?: ReactNode;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  children,
}) => {
  return (
    <div className={styles.notificationList}>
      {children}
      <div />
    </div>
  );
};
