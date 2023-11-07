import * as React from "react";
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
} from "react";
import { FullOnChangeProps } from "../types";
import styles from "./RadioButton.module.css";
import cx from "classnames";

export type RadioButtonSize = "standard" | "small";

export interface RadioButtonProps
  extends FullOnChangeProps<string, ChangeEvent<HTMLInputElement>>,
    Omit<ComponentPropsWithoutRef<"input">, "size" | "value"> {
  size?: RadioButtonSize;
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      onChange,
      onValueChange,
      size = "standard",
      name,
      className,
      ...inputProps
    },
    ref
  ) => {
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
        name={name}
        className={cx(styles.radiobutton, styles[size], className)}
        onChange={handleInputChange}
        ref={ref}
        {...inputProps}
      />
    );
  }
);
