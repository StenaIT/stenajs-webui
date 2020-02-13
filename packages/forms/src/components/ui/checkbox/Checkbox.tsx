import { InputProps } from "@stenajs-webui/core";
import * as React from "react";
import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { FullOnChangeProps } from "../types";
import styles from "./Checkbox.module.css";

export type CheckboxSize = "standard" | "small";

export interface CheckboxProps
  extends FullOnChangeProps<boolean, ChangeEvent<HTMLInputElement>>,
    Omit<InputProps<HTMLLabelElement>, "size"> {
  indeterminate?: boolean;
  size?: CheckboxSize;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  inputRef,
  indeterminate = false,
  onChange,
  onValueChange,
  value = false,
  size = "standard",
  ...inputProps
}) => {
  const innerInputRef = useRef(null);

  const inputRefToUse = inputRef || innerInputRef;

  const handleInputChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(ev);
      }
      if (onValueChange) {
        onValueChange(ev.target.checked);
      }
    },
    [onChange, onValueChange]
  );

  useEffect(() => {
    if (inputRefToUse.current) {
      inputRefToUse.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate, inputRefToUse]);

  return (
    <input
      type={"checkbox"}
      className={styles.checkbox + " " + styles[size]}
      checked={value}
      onChange={handleInputChange}
      ref={inputRefToUse}
      {...inputProps}
    />
  );
};
