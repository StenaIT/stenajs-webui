import cx from "classnames";
import * as React from "react";
import { PrimaryButton, PrimaryButtonProps } from "./PrimaryButton";
import styles from "./FlatButton.module.css";

export interface FlatButtonProps extends PrimaryButtonProps {
  inverted?: boolean;
}

export const FlatButton: React.FC<FlatButtonProps> = ({
  className,
  inverted,
  ...props
}) => (
  <PrimaryButton
    className={cx(className, styles.flatButton, inverted && styles.inverted)}
    {...props}
  />
);
