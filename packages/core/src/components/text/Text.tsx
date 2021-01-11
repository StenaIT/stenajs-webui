import * as React from "react";
import cx from "classnames";
import styles from "./Text.module.css";
import { SpanProps } from "../../types/ElementProps";
import { UserSelectProperty, WhiteSpaceProperty } from "csstype";
import { forwardRef } from "react";

export interface TextProps extends SpanProps {
  variant?: TextVariant;
  size?: TextSize;
  userSelect?: UserSelectProperty;
  whiteSpace?: WhiteSpaceProperty;
  color?: string;
}

export type TextVariant = "standard" | "caption" | "overline" | "bold";
export type TextSize = "large" | "medium" | "small" | "smaller";

export const Text = forwardRef<HTMLSpanElement, TextProps>(
  (
    {
      children,
      variant = "standard",
      size = "medium",
      className,
      color,
      userSelect,
      whiteSpace,
      style,
      ...spanProps
    },
    ref
  ) => {
    return (
      <span
        className={cx(styles.text, styles[variant], styles[size], className)}
        ref={ref}
        style={{ color, userSelect, whiteSpace, ...style }}
        {...spanProps}
      >
        {children}
      </span>
    );
  }
);
