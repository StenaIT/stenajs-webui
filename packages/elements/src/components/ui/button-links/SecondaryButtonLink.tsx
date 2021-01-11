import cx from "classnames";
import * as React from "react";
import { forwardRef } from "react";
import styles from "../buttons/SecondaryButton.module.css";
import { PrimaryButtonLink, PrimaryButtonLinkProps } from "./PrimaryButtonLink";

export const SecondaryButtonLink = forwardRef<
  HTMLAnchorElement,
  PrimaryButtonLinkProps
>(function SecondaryButtonLink({ className, ...props }, ref) {
  return (
    <PrimaryButtonLink
      ref={ref}
      className={cx(styles.secondaryButton, className)}
      {...props}
    />
  );
});
