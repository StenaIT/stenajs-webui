import { Heading, Row } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Icon } from "../icon/Icon";
import { cssColor } from "@stenajs-webui/theme";

export type CardHeaderVariant = "standard" | "compact";

export interface CardHeaderProps {
  text?: string;
  variant?: CardHeaderVariant;
  leftIcon?: IconDefinition;
  contentRight?: ReactNode;
  contentLeft?: ReactNode;
  contentCenter?: ReactNode;
  contentAfterHeading?: ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  text,
  variant = "standard",
  leftIcon,
  contentAfterHeading,
  contentRight,
  contentLeft,
  contentCenter,
  className,
}) => {
  return (
    <Row
      height={variant === "compact" ? 40 : 56}
      justifyContent={"space-between"}
      indent={3}
      borderBottom={`1px solid ${cssColor("--lhds-color-ui-300")}`}
      className={className}
    >
      <Row alignItems={"center"} gap={variant === "compact" ? 1 : 2}>
        {contentLeft}
        {leftIcon && (
          <Icon icon={leftIcon} size={variant === "compact" ? 16 : 24} />
        )}
        {text && (
          <Heading variant={variant === "compact" ? "h5" : "h4"}>
            {text}
          </Heading>
        )}
        {contentAfterHeading}
      </Row>
      {contentCenter && <Row alignItems={"center"}>{contentCenter}</Row>}
      <Row alignItems={"center"}>{contentRight}</Row>
    </Row>
  );
};
