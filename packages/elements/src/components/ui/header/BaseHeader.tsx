import { BoxProps, Heading, HeadingVariant, Row } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Icon } from "../icon/Icon";
import { cssColor } from "@stenajs-webui/theme";
import styles from "./BaseHeader.module.css";

export type HeaderVariant = "standard" | "compact" | "relaxed";

export interface BaseHeaderProps
  extends Pick<BoxProps, "className" | "flex" | "indent"> {
  text?: string;
  variant?: HeaderVariant;
  leftIcon?: IconDefinition;
  contentRight?: ReactNode;
  contentLeft?: ReactNode;
  contentCenter?: ReactNode;
  contentAfterHeading?: ReactNode;
  headingLevel?: HeadingVariant;
  textClassName?: string;
}

/**
 * @description For internal usage when constructing header components
 */
export const BaseHeader: React.FC<BaseHeaderProps> = ({
  text,
  variant = "standard",
  leftIcon,
  contentAfterHeading,
  contentRight,
  contentLeft,
  contentCenter,
  headingLevel = "h2",
  indent = 3,
  className,
  textClassName,
  ...boxProps
}) => {
  return (
    <Row
      justifyContent={"space-between"}
      borderBottom={`1px solid ${cssColor("--lhds-color-ui-300")}`}
      className={cx(styles.baseHeader, styles[variant], className)}
      indent={indent}
      {...boxProps}
    >
      <Row alignItems={"center"} gap={variant === "compact" ? 1 : 2}>
        {contentLeft}
        {leftIcon && <Icon icon={leftIcon} size={resolveIconSize(variant)} />}
        {text && (
          <Heading
            className={textClassName}
            variant={variant === "compact" ? "h5" : "h4"}
            as={headingLevel}
          >
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

const resolveIconSize = (variant: HeaderVariant) =>
  variant === "compact" ? 16 : variant === "relaxed" ? 24 : 20;
