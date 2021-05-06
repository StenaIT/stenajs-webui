import cx from "classnames";
import { Property } from "csstype";
import * as React from "react";
import { forwardRef } from "react";
import { H1Props } from "../../types/ElementProps";
import styles from "./Heading.module.css";
import WhiteSpace = Property.WhiteSpace;

export interface HeadingProps extends H1Props {
  variant?: HeadingVariant;
  whiteSpace?: WhiteSpace;
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
