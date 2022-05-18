import * as React from "react";
import cx from "classnames";
import styles from "./Text.module.css";
import { SpanProps } from "../../types/ElementProps";
import { Property } from "csstype";
import { forwardRef } from "react";

export interface TextProps extends SpanProps {
  variant?: TextVariant;
  size?: TextSize;
  userSelect?: Property.UserSelect;
  whiteSpace?: Property.WhiteSpace;
  wordBreak?: Property.WordBreak;
  color?: string;
  /** Sets the data-testid attribute of the DOM element. */
  testId?: string;
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
      testId,
      ...spanProps
    },
    ref
  ) => {
    return (
      <span
        className={cx(styles.text, styles[variant], styles[size], className)}
        ref={ref}
        style={{ color, userSelect, whiteSpace, wordBreak, ...style }}
        data-testid={testId}
        {...spanProps}
      >
        {children}
      </span>
    );
  }
);

export const Txt = Text;
