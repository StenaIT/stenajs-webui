import cx from "classnames";
import * as React from "react";
import { forwardRef } from "react";
import { BaseButton, BaseButtonProps } from "./common/BaseButton";
import styles from "./PrimaryButton.module.css";

export interface PrimaryButtonProps extends BaseButtonProps {}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  function PrimaryButton({ className, variant = "normal", ...props }, ref) {
    return (
      <BaseButton
        ref={ref}
        className={cx(styles.primaryButton, styles[variant], className)}
        variant={variant}
        {...props}
      />
    );
  },
);
