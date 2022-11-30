import cx from "classnames";
import { Property } from "csstype";
import * as React from "react";
import { forwardRef } from "react";
import { SpanProps } from "../../types/ElementProps";
import styles from "./Text.module.css";

export interface TextProps extends SpanProps {
  variant?: TextVariant;
  size?: TextSize;
  userSelect?: Property.UserSelect;
  whiteSpace?: Property.WhiteSpace;
  wordBreak?: Property.WordBreak;
  color?: string;
  fontWeight?: Property.FontWeight;
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
      wordBreak,
      style,
      fontWeight,
      ...spanProps
    },
    ref
  ) => {
    return (
      <span
        className={cx(styles.text, styles[variant], styles[size], className)}
        ref={ref}
        style={{
          color,
          userSelect,
          whiteSpace,
          wordBreak,
          fontWeight,
          ...style,
        }}
        {...spanProps}
      >
        {children}
      </span>
    );
  }
);

export const Txt = Text;
