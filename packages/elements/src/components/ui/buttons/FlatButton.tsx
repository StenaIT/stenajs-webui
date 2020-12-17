import cx from "classnames";
import * as React from "react";
import { PrimaryButton, PrimaryButtonProps } from "./PrimaryButton";
import styles from "./FlatButton.module.css";

export type FlatButtonProps = PrimaryButtonProps & {
  inverted?: boolean;
};

export const FlatButton: React.FC<FlatButtonProps> = ({
  className,
  inverted,
  ...props
}) => (
  <PrimaryButton
    className={cx(styles.flatButton, inverted && styles.inverted, className)}
    {...props}
  />
);
