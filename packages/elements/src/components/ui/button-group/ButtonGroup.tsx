import cx from "classnames";
import * as React from "react";
import styles from "./ButtonGroup.module.css";
import { ToggleButtonProps } from "../toggle-button/ToggleButton";
import { FlatButtonProps } from "../buttons/FlatButton";

export interface ButtonGroupProps {
  className?: string;
  children: Iterable<React.ReactElement<ToggleButtonProps | FlatButtonProps>>;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  className,
  children,
}) => {
  return <div className={cx(styles.buttonGroup, className)}>{children}</div>;
};
