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
  text,
  icon,
  iconAriaLabel,
  iconColor,
  contentLeft,
  contentRight,
  children,
  background,
}) => (
  <Column background={background}>
    <NotificationHeader
      text={text}
      icon={icon}
      iconAriaLabel={iconAriaLabel}
      iconColor={iconColor}
      contentLeft={contentLeft}
      contentRight={contentRight}
    />
    {children && (
      <Column indent={3}>
        {children}
        <Space num={2} />
      </Column>
    )}
  </Column>
);
