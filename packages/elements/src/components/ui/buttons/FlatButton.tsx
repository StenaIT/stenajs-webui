import cx from "classnames";
import * as React from "react";
import { forwardRef } from "react";
import { PrimaryButton, PrimaryButtonProps } from "./PrimaryButton";
import styles from "./FlatButton.module.css";

export interface FlatButtonProps extends PrimaryButtonProps {}

export const FlatButton = forwardRef<HTMLButtonElement, FlatButtonProps>(
  function FlatButton({ className, ...props }, ref) {
    return (
      <PrimaryButton
        ref={ref}
        className={cx(styles.flatButton, className)}
        {...props}
      />
    );
  }
);
