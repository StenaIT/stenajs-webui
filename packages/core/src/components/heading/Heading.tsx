import cx from "classnames";
import { Property } from "csstype";
import * as React from "react";
import { forwardRef } from "react";
import { H1Props } from "../../types/ElementProps";
import styles from "./Heading.module.css";

export interface HeadingProps extends H1Props {
  variant?: HeadingVariant;
  whiteSpace?: Property.WhiteSpace;
  wordBreak?: Property.WordBreak;
  as?: HeadingVariant;
}

export type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      variant = "h3",
      className,
      color,
      whiteSpace,
      wordBreak,
      style,
      children,
      as,
      ...hProps
    },
    ref,
  ) => {
    const Element = as ?? variant;
    return (
      <Element
        className={cx(styles.heading, styles[variant], className)}
        style={{ color, whiteSpace, wordBreak, ...style }}
        ref={ref}
        {...hProps}
      >
        {children}
      </Element>
    );
  },
);
