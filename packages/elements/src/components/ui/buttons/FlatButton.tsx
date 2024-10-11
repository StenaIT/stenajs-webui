import cx from "classnames";
import * as React from "react";
import { forwardRef } from "react";
import { BaseButton, BaseButtonProps } from "./common/BaseButton";
import styles from "./FlatButton.module.css";

export interface FlatButtonProps extends BaseButtonProps {}

export const FlatButton = forwardRef<HTMLButtonElement, FlatButtonProps>(
  function FlatButton({ className, variant = "normal", ...props }, ref) {
    return (
      <BaseButton
        ref={ref}
        className={cx(styles.flatButton, styles[variant], className)}
        variant={variant}
        {...props}
      />
    );
  },
);
