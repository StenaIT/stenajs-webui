import cx from "classnames";
import * as React from "react";
import { PrimaryButtonLink, PrimaryButtonLinkProps } from "./PrimaryButtonLink";
import styles from "../buttons/FlatButton.module.css";

export interface FlatButtonLinkProps extends PrimaryButtonLinkProps {
  inverted?: boolean;
}

export const FlatButtonLink: React.FC<FlatButtonLinkProps> = ({
  className,
  inverted,
  ...props
}) => (
  <PrimaryButtonLink
    className={cx(styles.flatButton, inverted && styles.inverted, className)}
    {...props}
  />
);
