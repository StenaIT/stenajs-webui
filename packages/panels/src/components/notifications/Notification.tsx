import { Column, Space } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import {
  NotificationHeader,
  NotificationHeaderProps,
} from "./NotificationHeader";

export interface NotificationProps extends NotificationHeaderProps {
  children?: ReactNode;
}

export const Notification: React.FC<NotificationProps> = ({
  children,
  ...headerProps
}) => (
  <Column
    background={"var(--lhds-color-ui-50)"}
    borderRadius={"var(--swui-border-radius)"}
  >
    <NotificationHeader {...headerProps} />
    {children && (
      <Column indent={3}>
        {children}
        <Space num={2} />
      </Column>
    )}
  </Column>
);
