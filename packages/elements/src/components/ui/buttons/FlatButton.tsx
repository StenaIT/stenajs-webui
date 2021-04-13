import cx from "classnames";
import * as React from "react";
import { forwardRef } from "react";
import { PrimaryButton, PrimaryButtonProps } from "./PrimaryButton";
import styles from "./FlatButton.module.css";

export type FlatButtonProps = PrimaryButtonProps & {
  inverted?: boolean;
};

export const FlatButton = forwardRef<HTMLButtonElement, FlatButtonProps>(
  function FlatButton({ className, inverted, ...props }, ref) {
    return (
      <PrimaryButton
        ref={ref}
        className={cx(
          styles.flatButton,
          inverted && styles.inverted,
          className
        )}
        {...props}
      />
    );
  }
);
