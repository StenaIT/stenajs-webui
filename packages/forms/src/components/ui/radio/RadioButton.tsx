import * as React from "react";
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
} from "react";
import { FullOnChangeProps } from "../types";
import styles from "./RadioButton.module.css";

export type RadioButtonSize = "standard" | "small";

export interface RadioButtonProps
  extends FullOnChangeProps<string, ChangeEvent<HTMLInputElement>>,
    Omit<ComponentPropsWithoutRef<"input">, "size" | "value"> {
  size?: RadioButtonSize;
  /** Sets the data-testid attribute of the DOM element. */
  testId?: string;
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    { onChange, onValueChange, size = "standard", name, testId, ...inputProps },
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
        className={styles.radiobutton + " " + styles[size]}
        onChange={handleInputChange}
        ref={ref}
        data-testid={testId}
        {...inputProps}
      />
    );
  }
);
