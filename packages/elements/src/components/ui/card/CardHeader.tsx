import { BoxProps, Heading, HeadingVariant, Row } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Icon } from "../icon/Icon";

export type CardHeaderVariant = "standard" | "compact";

export interface CardHeaderProps extends Pick<BoxProps, "className" | "flex"> {
  text?: string;
  variant?: CardHeaderVariant;
  leftIcon?: IconDefinition;
  contentRight?: ReactNode;
  contentLeft?: ReactNode;
  contentCenter?: ReactNode;
  contentAfterHeading?: ReactNode;
  headingLevel?: HeadingVariant;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  text,
  variant = "standard",
  leftIcon,
  contentAfterHeading,
  contentRight,
  contentLeft,
  contentCenter,
  headingLevel = "h2",
  ...boxProps
}) => {
  return (
    <Row
      height={variant === "compact" ? 40 : 56}
      justifyContent={"space-between"}
      indent={3}
      {...boxProps}
    >
      <Row alignItems={"center"} gap={variant === "compact" ? 1 : 2}>
        {contentLeft}
        {leftIcon && (
          <Icon icon={leftIcon} size={variant === "compact" ? 16 : 24} />
        )}
        {text && (
          <Heading variant={"h5"} as={headingLevel}>
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
