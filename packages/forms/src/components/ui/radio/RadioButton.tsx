import { InputProps } from "@stenajs-webui/core";
import * as React from "react";
import { ChangeEvent, useCallback, useRef } from "react";
import { FullOnChangeProps } from "../types";
import styles from "./RadioButton.module.css";

export type RadioButtonSize = "standard" | "small";

export interface RadioButtonProps
  extends FullOnChangeProps<boolean, ChangeEvent<HTMLInputElement>>,
    Omit<InputProps<HTMLButtonElement>, "size"> {
  size?: RadioButtonSize;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  onChange,
  onValueChange,
  value = false,
  inputRef,
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

  return (
    <input
      type={"radio"}
      className={styles.radiobutton + " " + styles[size]}
      checked={value}
      onChange={handleInputChange}
      ref={inputRefToUse}
      {...inputProps}
    />
  );
};
