import { Heading, Row } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { ReactNode } from "react";
import styles from "./CardHeader.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Icon } from "../icon/Icon";

export type CardHeaderVariant = "standard" | "compact";

export interface CardHeaderProps {
  text?: string;
  variant?: CardHeaderVariant;
  leftIcon?: IconDefinition;
  contentRight?: ReactNode;
  contentLeft?: ReactNode;
  contentCenter?: ReactNode;
  contentAfterHeading?: ReactNode;
}

export const CardHeader: React.VFC<CardHeaderProps> = ({
  text,
  variant = "standard",
  leftIcon,
  contentAfterHeading,
  contentRight,
  contentLeft,
  contentCenter,
}) => {
  return (
    <div className={cx(styles.cardHeader, styles[variant])}>
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
    </div>
  );
};
