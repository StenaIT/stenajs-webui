import { Heading, Indent, Row, Space } from "@stenajs-webui/core";
import * as cx from "classnames";
import * as React from "react";
import { ReactNode } from "react";
import styles from "./CardHeader.module.css";

export type CardHeaderVariant = "standard" | "compact";

export interface CardHeaderProps {
  text?: string;
  variant?: CardHeaderVariant;
  contentRight?: ReactNode;
  contentLeft?: ReactNode;
  contentAfterHeading?: ReactNode;
}

export const CardHeader: React.VFC<CardHeaderProps> = ({
  text,
  variant = "standard",
  contentAfterHeading,
  contentRight,
  contentLeft,
}) => {
  return (
    <div className={cx(styles.cardHeader, styles[variant])}>
      <Row alignItems={"center"}>
        <Space />
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
      <Row>{contentRight}</Row>
    </div>
  );
};
