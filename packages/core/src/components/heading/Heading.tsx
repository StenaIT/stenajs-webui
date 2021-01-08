import * as React from "react";
import cx from "classnames";
import { H1Props } from "../../types/ElementProps";
import styles from "./Heading.module.css";
import { WhiteSpaceProperty } from "csstype";
import { forwardRef } from "react";

export interface HeadingProps extends H1Props {
  variant?: HeadingVariant;
  whiteSpace?: WhiteSpaceProperty;
}

export type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      variant = "h3",
      className,
      color,
      whiteSpace,
      style,
      children,
      ...hProps
    },
    ref
  ) => {
    const Element = variant;
    return (
      <Element
        className={cx(styles.heading, className)}
        style={{ color, whiteSpace, ...style }}
        ref={ref}
        {...hProps}
      >
        {children}
      </Element>
    );
  }
);
