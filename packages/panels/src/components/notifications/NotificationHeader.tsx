import { Box, Row, Txt } from "@stenajs-webui/core";
import * as React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FlatButton, Icon, stenaTimes } from "@stenajs-webui/elements";
import { cssColor } from "@stenajs-webui/theme";

export interface NotificationHeaderProps {
  /** Text. */
  text: string;
  /** Timestamp. */
  timestamp?: string;
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
  /** What happens on clicking close. */
  onClose?: () => void;
}

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  text,
  timestamp,
  icon,
  iconAriaLabel,
  iconColor,
  contentLeft,
  contentRight,
  onClose,
}) => (
  <Row alignItems={"flex-start"} indent spacing>
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
      <Box minHeight={20} justifyContent={"center"} flex={1} gap={0.5}>
        <Txt variant={"bold"}>{text}</Txt>
        {timestamp && (
          <Txt size={"small"} color={cssColor("--lhds-color-ui-600")}>
            {timestamp}
          </Txt>
        )}
      </Box>
      {contentRight}
    </Row>
    {onClose && (
      <Box
        flex={"none"}
        justifyContent={"center"}
        style={{
          height: "calc(20px + 2 * var(--swui-metrics-spacing))",
        }}
      >
        <FlatButton
          leftIcon={stenaTimes}
          onClick={onClose}
          aria-label={"Close"}
        />
      </Box>
    )}
  </Row>
);
