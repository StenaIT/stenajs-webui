import cx from "classnames";
import * as React from "react";
import { PrimaryButton, PrimaryButtonProps } from "./PrimaryButton";
import styles from "./SecondaryButton.module.css";

export const SecondaryButton: React.FC<PrimaryButtonProps> = ({
  className,
  ...props
}) => (
  <PrimaryButton className={cx(styles.secondaryButton, className)} {...props} />
);
