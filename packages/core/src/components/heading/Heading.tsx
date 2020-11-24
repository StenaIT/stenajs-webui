import * as React from "react";
import cx from "classnames";
import { H1Props } from "../../types/ElementProps";
import styles from "./Heading.module.css";
import { WhiteSpaceProperty } from "csstype";

export interface HeadingProps extends H1Props {
  variant?: HeadingVariant;
  whiteSpace?: WhiteSpaceProperty;
}

export type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export const Heading: React.FC<HeadingProps> = ({
  variant: Element = "h3",
  className,
  color,
  whiteSpace,
  style,
  children,
  ...hProps
}) => {
  return (
    <Element
      className={cx(styles.heading, className)}
      {...hProps}
      style={{ color, whiteSpace, ...style }}
    >
      {children}
    </Element>
  );
};
