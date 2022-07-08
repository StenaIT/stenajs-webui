import cx from "classnames";
import * as React from "react";
import styles from "./ButtonGroup.module.css";
import { ReactNode } from "react";

export interface ButtonGroupProps {
  className?: string;
  children?: ReactNode;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  className,
  children,
}) => {
  return <div className={cx(styles.buttonGroup, className)}>{children}</div>;
};
