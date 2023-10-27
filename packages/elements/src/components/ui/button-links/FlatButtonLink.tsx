import * as React from "react";
import { forwardRef } from "react";
import cx from "classnames";
import { BaseButtonLink, BaseButtonLinkProps } from "./common/BaseButtonLink";
import styles from "../buttons/FlatButton.module.css";

export interface FlatButtonLinkProps extends BaseButtonLinkProps {}

export const FlatButtonLink = forwardRef<
  HTMLAnchorElement,
  FlatButtonLinkProps
>(function FlatButtonLink({ className, variant = "normal", ...props }, ref) {
  return (
    <BaseButtonLink
      ref={ref}
      variant={variant}
      className={cx(styles.flatButton, styles[variant], className)}
      {...props}
    />
  );
});
