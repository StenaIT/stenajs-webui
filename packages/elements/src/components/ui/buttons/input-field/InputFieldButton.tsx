import cx from "classnames";
import * as React from "react";
import { forwardRef } from "react";
import { Icon } from "../../icon/Icon";
import styles from "./InputFieldButton.module.css";

export interface InputFieldProps {
  className?: string;
  icon?: any;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const InputFieldButton = forwardRef<HTMLButtonElement, InputFieldProps>(
  function InputFieldButton({ className, icon, disabled, onClick }, ref) {
    return (
      <button
        ref={ref}
        className={cx(styles.inputFieldButton, className)}
        disabled={disabled}
        onClick={onClick}
      >
        {icon && <Icon icon={icon} size={16} />}
      </button>
    );
  }
);
