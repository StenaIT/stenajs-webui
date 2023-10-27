import * as React from "react";
import { forwardRef } from "react";
import cx from "classnames";
import { BaseButtonLink, BaseButtonLinkProps } from "./common/BaseButtonLink";
import styles from "../buttons/PrimaryButton.module.css";

export interface PrimaryButtonLinkProps extends BaseButtonLinkProps {}

export const PrimaryButtonLink = forwardRef<
  HTMLAnchorElement,
  PrimaryButtonLinkProps
>(function PrimaryButtonLink({ className, variant = "normal", ...props }, ref) {
  return (
    <BaseButtonLink
      ref={ref}
      variant={variant}
      className={cx(styles.primaryButton, styles[variant], className)}
      {...props}
    />
  );
});
