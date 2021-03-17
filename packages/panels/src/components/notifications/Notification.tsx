import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Box, Clickable, Column, Row, Space, Text } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import { cssColor } from "@stenajs-webui/theme";
import { formatDistance } from "date-fns";
import * as React from "react";
import { ReactNode, useMemo } from "react";
import {
  defaultNotificationTheme,
  NotificationTheme,
} from "./NotificationTheme";

export interface NotificationProps {
  title?: string;
  text?: string;
  content?: ReactNode;
  dismissed?: boolean;
  date?: Date;
  icon?: IconDefinition;
  iconColor?: string;
  onClick?: () => void;
  theme?: NotificationTheme;
}

export const Notification: React.FC<NotificationProps> = ({
  onClick,
  icon,
  iconColor,
  title,
  text,
  content,
  date,
  dismissed,
  theme = defaultNotificationTheme,
}) => {
  const agoLabel = useMemo(() => {
    if (date) {
      return `${formatDistance(date, new Date())} ago`;
    }
    return undefined;
  }, [date]);

  return (
    <Clickable onClick={onClick} style={{ textAlign: "left" }}>
      <Box
        background={
          dismissed ? theme.notificationDismissedBg : theme.notificationBg
        }
        hoverBackground={
          dismissed
            ? theme.notificationDismissedHoverBg
            : theme.notificationHoverBg
        }
        spacing
        indent
      >
        <Row width={"250px"}>
          {icon && (
            <Row width={"34px"} alignItems={"center"}>
              <Icon icon={icon} color={iconColor} />
            </Row>
          )}
          <Column flex={1}>
            {title && (
              <>
                <Text>{title}</Text>
                <Space half />
              </>
            )}
            {text && (
              <>
                <Text size={"small"}>{text}</Text>
                <Space half />
              </>
            )}
            {content && (
              <>
                {content}
                <Space half />
              </>
            )}
            <Text size={"small"} color={cssColor("--swui-text-disabled-color")}>
              {agoLabel}
            </Text>
          </Column>
        </Row>
      </Box>
    </Clickable>
  );
};
