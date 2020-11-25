import * as React from "react";
import cx from "classnames";
import styles from "./Text.module.css";
import { SpanProps } from "../../types/ElementProps";
import { UserSelectProperty, WhiteSpaceProperty } from "csstype";

export interface TextProps extends SpanProps {
  variant?: TextVariants;
  size?: TextSize;
  userSelect?: UserSelectProperty;
  whiteSpace?: WhiteSpaceProperty;
  color?: string;
}

export type TextVariants = "standard" | "caption" | "overline" | "bold";
export type TextSize = "large" | "medium" | "small" | "smaller";

export const Text: React.FC<TextProps> = ({
  children,
  variant = "standard",
  size = "medium",
  className,
  color,
  userSelect,
  whiteSpace,
  style,
  ...spanProps
}) => {
  return (
    <span
      className={cx(styles.text, styles[variant], styles[size], className)}
      {...spanProps}
      style={{ color, userSelect, whiteSpace, ...style }}
    >
      {children}
    </span>
  );
};
