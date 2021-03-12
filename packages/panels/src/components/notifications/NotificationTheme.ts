export interface NotificationTheme {
  notificationBg: string;
  notificationHoverBg: string;
  notificationDismissedBg: string;
  notificationDismissedHoverBg: string;
}

export const defaultNotificationTheme: NotificationTheme = {
  notificationBg: "#eaeaea",
  notificationHoverBg: "#eeeeee",
  notificationDismissedBg: "#ffffff",
  notificationDismissedHoverBg: "#f4f4f4",
};
