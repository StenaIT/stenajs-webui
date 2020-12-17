import cx from "classnames";
import * as React from "react";
import styles from "../buttons/SecondaryButton.module.css";
import { PrimaryButtonLink, PrimaryButtonLinkProps } from "./PrimaryButtonLink";

export const SecondaryButtonLink: React.FC<PrimaryButtonLinkProps> = ({
  className,
  ...props
}) => (
  <PrimaryButtonLink
    className={cx(styles.secondaryButton, className)}
    {...props}
  />
);
