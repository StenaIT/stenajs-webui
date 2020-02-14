import { InputProps } from "@stenajs-webui/core";
import * as React from "react";
import { ChangeEvent, useCallback } from "react";
import { FullOnChangeProps } from "../types";
import styles from "./RadioButton.module.css";

export type RadioButtonSize = "standard" | "small";

export interface RadioButtonProps
  extends FullOnChangeProps<string, ChangeEvent<HTMLInputElement>>,
    Omit<InputProps<HTMLButtonElement>, "size"> {
  size?: RadioButtonSize;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  onChange,
  onValueChange,
  size = "standard",
  ...inputProps
}) => {
  const handleInputChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(ev);
      }
      if (onValueChange) {
        onValueChange(ev.target.value);
      }
    },
    [onChange, onValueChange]
  );

  return (
    <input
      type={"radio"}
      className={styles.radiobutton + " " + styles[size]}
      onChange={handleInputChange}
      {...inputProps}
    />
  );
};
