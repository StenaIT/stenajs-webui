import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import * as React from "react";
import { MouseEventHandler } from "react";
import styles from "./NewButton.module.css";

export type ButtonSize = "normal" | "small" | "large";
export const NewButton: React.FC<{
  label: string;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  leftIcon?: IconDefinition;
  rightIcon?: IconDefinition;
}> = ({ label, size = "normal", disabled, leftIcon, rightIcon, onClick }) => (
  <button
    onClick={onClick}
    className={cx(styles.button, styles[size], !label && styles.iconButton)}
    disabled={disabled}
  >
    {leftIcon && (
      <FontAwesomeIcon icon={leftIcon} className={styles.iconLeft} />
    )}
    {label && <span>{label}</span>}
    {rightIcon && (
      <FontAwesomeIcon icon={rightIcon} className={styles.iconRight} />
    )}
  </button>
);
