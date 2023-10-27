import cx from "classnames";
import * as React from "react";
import { forwardRef } from "react";
import { BaseButton, BaseButtonProps } from "./common/BaseButton";
import styles from "./SecondaryButton.module.css";

export interface SecondaryButtonProps extends BaseButtonProps {}

export const SecondaryButton = forwardRef<
  HTMLButtonElement,
  SecondaryButtonProps
>(function SecondaryButton({ className, variant = "normal", ...props }, ref) {
  return (
    <BaseButton
      ref={ref}
      className={cx(styles.secondaryButton, styles[variant], className)}
      variant={variant}
      {...props}
    />
  );
});
