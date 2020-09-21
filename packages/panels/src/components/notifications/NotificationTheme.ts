import { ThemeColorField } from "@stenajs-webui/core";

export interface NotificationTheme {
  notificationBg: ThemeColorField | string;
  notificationHoverBg: ThemeColorField | string;
  notificationDismissedBg: ThemeColorField | string;
  notificationDismissedHoverBg: ThemeColorField | string;
}

export const defaultNotificationTheme: NotificationTheme = {
  notificationBg: "#eaeaea",
  notificationHoverBg: "#eeeeee",
  notificationDismissedBg: "#ffffff",
  notificationDismissedHoverBg: "#f4f4f4",
};
