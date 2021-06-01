import { Heading, Indent, Row } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { ReactNode } from "react";
import styles from "./CardHeader.module.css";

export type CardHeaderVariant = "standard" | "compact";

export interface CardHeaderProps {
  text?: string;
  variant?: CardHeaderVariant;
  contentRight?: ReactNode;
  contentLeft?: ReactNode;
  contentCenter?: ReactNode;
  contentAfterHeading?: ReactNode;
}

export const CardHeader: React.VFC<CardHeaderProps> = ({
  text,
  variant = "standard",
  contentAfterHeading,
  contentRight,
  contentLeft,
  contentCenter,
}) => {
  return (
    <div className={cx(styles.cardHeader, styles[variant])}>
      <Row alignItems={"center"}>
        {contentLeft && (
          <>
            {contentLeft}
            <Indent />
          </>
        )}
        {text && (
          <>
            <Heading variant={variant === "compact" ? "h4" : "h3"}>
              {text}
            </Heading>
            <Indent />
          </>
        )}
        {contentAfterHeading}
      </Row>
      {contentCenter && <Row alignItems={"center"}>{contentCenter}</Row>}
      <Row alignItems={"center"}>{contentRight}</Row>
    </div>
  );
};
