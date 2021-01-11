import cx from "classnames";
import * as React from "react";
import { forwardRef } from "react";
import { PrimaryButtonLink, PrimaryButtonLinkProps } from "./PrimaryButtonLink";
import styles from "../buttons/FlatButton.module.css";

export interface FlatButtonLinkProps extends PrimaryButtonLinkProps {
  inverted?: boolean;
}

export const FlatButtonLink = forwardRef<
  HTMLAnchorElement,
  FlatButtonLinkProps
>(function FlatButtonLink({ className, inverted, ...props }, ref) {
  return (
    <PrimaryButtonLink
      ref={ref}
      className={cx(styles.flatButton, inverted && styles.inverted, className)}
      {...props}
    />
  );
});
