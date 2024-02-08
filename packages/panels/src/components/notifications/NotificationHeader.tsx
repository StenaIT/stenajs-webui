import { Box, Row, Text } from "@stenajs-webui/core";
import * as React from "react";
import { CircledIcon, CloseButton, MediumIcon } from "@stenajs-webui/elements";
import { cssColor, CssPropColor } from "@stenajs-webui/theme";
import { UnreadDot } from "./UnreadDot";
import { NotificationVariant } from "./Notification";

export interface NotificationHeaderProps {
  /** Text. */
  text: string;
  /** Timestamp. */
  timestamp?: string;
  /** Icon. */
  icon?: MediumIcon;
  /** Icon description for accessibility. */
  iconAriaLabel?: string;
  /** Left content instead of icon. */
  contentLeft?: React.ReactNode;
  /** Right content. */
  contentRight?: React.ReactNode;
  /** What happens on clicking close. */
  onClose?: () => void;
  /** Mark the notification as unread */
  unread?: boolean;
  /** Notification variant. Will affect icon bg color */
  variant?: NotificationVariant;
  /** Icon background color. Will override other icon bg color */
  iconBackgroundColor?: CssPropColor;
}

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  text,
  timestamp,
  icon,
  iconAriaLabel,
  contentLeft,
  contentRight,
  onClose,
  unread = false,
  variant,
  iconBackgroundColor,
}) => {
  const circledIcon = icon ? (
    <CircledIcon
      size={"small"}
      icon={icon}
      aria-label={iconAriaLabel}
      backgroundColor={
        iconBackgroundColor
          ? iconBackgroundColor
          : getIconBgColorFromVariant(unread, variant)
      }
    />
  ) : undefined;

  return (
    <Row alignItems={"flex-start"} indent={2} spacing>
      <Row spacing gap={2} flex={1} alignItems={"flex-start"}>
        {contentLeft && (
          <Box minHeight={20} justifyContent={"center"}>
            {contentLeft}
          </Box>
        )}
        {!contentLeft &&
          circledIcon &&
          (unread ? <UnreadDot>{circledIcon}</UnreadDot> : circledIcon)}
        <Box minHeight={20} justifyContent={"center"} flex={1} gap={0.5}>
          <Text variant={"bold"}>{text}</Text>
          {timestamp && (
            <Text
              size={"small"}
              color={cssColor(
                unread ? "--lhds-color-blue-600" : "--lhds-color-ui-600"
              )}
            >
              {timestamp}
            </Text>
          )}
        </Box>
        {contentRight}
      </Row>
      {onClose && (
        <Box
          flex={"none"}
          justifyContent={"center"}
          height={"calc(20px + 2 * var(--swui-metrics-spacing))"}
        >
          <CloseButton onClick={onClose} />
        </Box>
      )}
    </Row>
  );
};

export const getIconBgColorFromVariant = (
  unread: boolean,
  variant?: NotificationVariant
): CssPropColor | undefined => {
  if (!unread && variant === "standard") {
    return undefined;
  }
  return "--lhds-color-ui-50";
};
