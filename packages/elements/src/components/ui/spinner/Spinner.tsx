import * as React from "react";
import SpinnerSvg from "./spinner-large.svg?react";
import cx from "classnames";
import styles from "./Spinner.module.css";
import { getDataProps } from "@stenajs-webui/core";

export interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  color?: string;
}

export type SpinnerVariant = "standard" | "inverted";

export type SpinnerSize = "medium" | "small" | "tiny";

export const Spinner: React.FC<SpinnerProps> = ({
  size = "medium",
  variant = "standard",
  color,
  ...rest
}) => (
  <SpinnerSvg
    className={cx(
      styles.spinner,
      styles[size],
      color ? styles.customColor : styles[variant]
    )}
    style={{ stroke: color }}
    {...getDataProps(rest)}
  />
);
