import cx from "classnames";
import * as React from "react";
import { NewButton, NewButtonProps } from "./NewButton";
import styles from "./SecondaryButton.module.css";

export const SecondaryButton: React.FC<NewButtonProps> = ({
  className,
  ...props
}) => (
  <NewButton className={cx(className, styles.secondaryButton)} {...props} />
);
