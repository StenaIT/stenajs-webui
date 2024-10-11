import * as React from "react";
import { forwardRef } from "react";
import cx from "classnames";
import { BaseButtonLink, BaseButtonLinkProps } from "./common/BaseButtonLink";
import styles from "../buttons/SecondaryButton.module.css";

export interface SecondaryButtonLinkProps extends BaseButtonLinkProps {}

export const SecondaryButtonLink = forwardRef<
  HTMLAnchorElement,
  SecondaryButtonLinkProps
>(function SecondaryButtonLink(
  { className, variant = "normal", ...props },
  ref,
) {
  return (
    <BaseButtonLink
      ref={ref}
      variant={variant}
      className={cx(styles.secondaryButton, styles[variant], className)}
      {...props}
    />
  );
});
