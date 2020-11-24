import * as React from "react";
import cx from "classnames";
import styles from "./Text.module.css";
import { SpanProps } from "../../types/ElementProps";

interface TextProps extends SpanProps {
  variant?: TextVariants;
  size?: TextSize;
}

export type TextVariants = "standard" | "caption" | "overline" | "bold";
export type TextSize = "large" | "normal" | "small";

export const Text: React.FC<TextProps> = ({
  children,
  variant = "standard",
  size = "medium",
  className,
  ...spanProps
}) => {
  return (
    <span
      className={cx(styles.text, styles[variant], styles[size], className)}
      {...spanProps}
    >
      {children}
    </span>
  );
};
