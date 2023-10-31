import * as React from "react";
import { ChangeEventHandler, useCallback } from "react";
import cx from "classnames";
import { InputLabel } from "../input-label/InputLabel";
import styles from "./LabelledTextInput.module.css";
import { InputElementProps } from "@stenajs-webui/core";
import { ValueAndOnValueChangeProps } from "../types";

export type LabelledTextInputVariant = "normal" | "error";
export type LabelledTextInputSize = "medium" | "large";

export type LabelledTextInputBorderVariant =
  | "normalBorder"
  | "onlyTop"
  | "onlyBottom";

export interface LabelledTextInputProps
  extends Omit<InputElementProps, "value" | "size">,
    ValueAndOnValueChangeProps<string> {
  id: string;
  label?: string;
  size?: LabelledTextInputSize;
  screenReaderLabel?: string;
  pattern?: string;
  borderRadiusVariant?: LabelledTextInputBorderVariant;
  variant?: LabelledTextInputVariant;
}

export const LabelledTextInput = React.forwardRef<
  HTMLInputElement,
  LabelledTextInputProps
>(
  (
    {
      autoComplete = "off",
      label,
      id,
      screenReaderLabel,
      size = "medium",
      value,
      onChange,
      disabled,
      onValueChange,
      borderRadiusVariant = "normalBorder",
      variant = "normal",
      ...inputProps
    },
    ref
  ) => {
    const onChangeHandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (ev) => {
        onChange?.(ev);
        onValueChange?.(ev.target.value);
      },
      [onChange, onValueChange]
    );

    return (
      <div
        className={cx(
          styles.labelledTextInput,
          styles[variant],
          styles[borderRadiusVariant],
          styles[size],
          disabled && styles.disabled
        )}
      >
        <InputLabel
          htmlFor={id}
          screenReaderLabel={screenReaderLabel}
          label={label}
        />
        <input
          ref={ref}
          id={id}
          autoComplete={autoComplete}
          type={"text"}
          value={value}
          onChange={onChangeHandler}
          disabled={disabled}
          {...inputProps}
        />
      </div>
    );
  }
);
