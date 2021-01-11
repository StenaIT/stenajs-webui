import cx from "classnames";
import * as React from "react";
import { forwardRef } from "react";
import { PrimaryButton, PrimaryButtonProps } from "./PrimaryButton";
import styles from "./SecondaryButton.module.css";

export const SecondaryButton = forwardRef<
  HTMLButtonElement,
  PrimaryButtonProps
>(function SecondaryButton({ className, ...props }, ref) {
  return (
    <PrimaryButton
      ref={ref}
      className={cx(styles.secondaryButton, className)}
      {...props}
    />
  );
});
