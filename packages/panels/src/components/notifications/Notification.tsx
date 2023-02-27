import { BoxProps, Column, Space } from "@stenajs-webui/core";
import * as React from "react";
import {
  NotificationHeader,
  NotificationHeaderProps,
} from "./NotificationHeader";

export interface NotificationProps
  extends Pick<BoxProps, "children" | "background">,
    NotificationHeaderProps {}

export const Notification: React.FC<NotificationProps> = ({
  children,
  background,
  ...headerProps
}) => (
  <Column background={background}>
    <NotificationHeader {...headerProps} />
    {children && (
      <Column indent={3}>
        {children}
        <Space num={2} />
      </Column>
    )}
  </Column>
);
