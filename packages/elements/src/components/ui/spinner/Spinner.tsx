import * as React from "react";
import { ReactComponent as SpinnerSvg } from "./spinner-large.svg";
import cx from "classnames";
import styles from "./Spinner.module.css";

export interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  color?: string;
  /** Sets the data-testid attribute of the DOM element. */
  testId?: string;
}

export type SpinnerVariant = "standard" | "inverted";

export type SpinnerSize = "medium" | "small" | "tiny";

export const Spinner: React.FC<SpinnerProps> = ({
  size = "medium",
  variant = "standard",
  color,
  testId,
}) => (
  <SpinnerSvg
    className={cx(
      styles.spinner,
      styles[size],
      color ? styles.customColor : styles[variant]
    )}
    style={{ stroke: color }}
    data-testid={testId}
  />
);
