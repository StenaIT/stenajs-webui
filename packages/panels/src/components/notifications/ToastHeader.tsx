import * as React from "react";
import {
  InnerNotificationHeader,
  NotificationHeaderProps,
} from "./NotificationHeader";

export interface ToastHeaderProps
  extends Omit<NotificationHeaderProps, "contentRight"> {}

export const ToastHeader: React.FC<ToastHeaderProps> = (props) => (
  <InnerNotificationHeader {...props} />
);
