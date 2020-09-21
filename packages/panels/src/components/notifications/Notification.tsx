import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  Box,
  Clickable,
  Column,
  Row,
  SmallText,
  Space,
  StandardText,
  ThemeColorField,
  useThemeFields,
} from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
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
  iconColor?: ThemeColorField | string;
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
  const { colors } = useThemeFields(
    {
      colors: {
        notificationBg: theme.notificationBg,
        notificationHoverBg: theme.notificationHoverBg,
        notificationDismissedBg: theme.notificationDismissedBg,
        notificationDismissedHoverBg: theme.notificationDismissedHoverBg,
        disabledText: "disabledText",
      },
    },
    [theme]
  );
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
          dismissed ? colors.notificationDismissedBg : colors.notificationBg
        }
        hoverBackground={
          dismissed
            ? colors.notificationDismissedHoverBg
            : colors.notificationHoverBg
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
                <StandardText>{title}</StandardText>
                <Space half />
              </>
            )}
            {text && (
              <>
                <SmallText>{text}</SmallText>
                <Space half />
              </>
            )}
            {content && (
              <>
                {content}
                <Space half />
              </>
            )}
            <SmallText color={colors.disabledText}>{agoLabel}</SmallText>
          </Column>
        </Row>
      </Box>
    </Clickable>
  );
};
