import { Box, Row, Txt } from "@stenajs-webui/core";
import * as React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Icon } from "@stenajs-webui/elements";

export interface NotificationHeaderProps {
  /** Text. */
  text: string;
  /** Icon. */
  icon?: IconDefinition;
  /** Icon description for accessibility. */
  iconAriaLabel?: string;
  /** Icon colour. */
  iconColor?: string;
  /** Left content instead of icon. */
  contentLeft?: React.ReactNode;
  /** Right content. */
  contentRight?: React.ReactNode;
}

export const InnerNotificationHeader: React.FC<NotificationHeaderProps> = ({
  text,
  icon,
  iconAriaLabel,
  iconColor,
  contentLeft,
  contentRight,
}) => (
  <Row indent={2} spacing gap={2} flex={1} alignItems={"flex-start"}>
    {contentLeft && (
      <Box minHeight={20} justifyContent={"center"}>
        {contentLeft}
      </Box>
    )}
    {!contentLeft && icon && (
      <Icon
        icon={icon}
        size={20}
        color={iconColor}
        aria-label={iconAriaLabel}
      />
    )}
    <Box minHeight={20} justifyContent={"center"} flex={1}>
      <Txt variant={"bold"}>{text}</Txt>
    </Box>
    {contentRight}
  </Row>
);

export const NotificationHeader: React.FC<NotificationHeaderProps> = (
  props
) => (
  <Box indent spacing>
    <InnerNotificationHeader {...props} />
  </Box>
);
