import { Ref } from "react";
import * as React from "react";
import { ButtonElementProps } from "@stenajs-webui/core";
import { ValueAndOnValueChangeProps } from "../types";
import styles from "./Switch.module.css";

export interface SwitchProps
  extends Omit<ButtonElementProps, "value">,
    ValueAndOnValueChangeProps<boolean> {
  wrapperRef?: Ref<HTMLDivElement>;
}

const styleChecked = `${styles.switch} ${styles.checked}`;

export const Switch: React.FC<SwitchProps> = ({
  value,
  disabled,
  onValueChange,
  className,
  wrapperRef,
  ...restProps
}) => {
  return (
    <div className={className} ref={wrapperRef}>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        className={value ? styleChecked : styles.switch}
        disabled={disabled}
        onClick={() => onValueChange && onValueChange(!value)}
        {...restProps}
      >
        <div className={styles.filler} />
        <div className={styles.knob} />
      </button>
    </div>
  );
};
