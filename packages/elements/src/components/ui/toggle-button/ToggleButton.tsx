import { InputElementProps } from "@stenajs-webui/core";
import * as React from "react";
import { forwardRef, useCallback, useId } from "react";
import cx from "classnames";
import styles from "./ToggleButton.module.css";

export type ToggleButtonSize = "small" | "medium" | "large";

export interface ToggleButtonProps
  extends Omit<InputElementProps, "value" | "size" | "checked"> {
  value?: boolean;
  onValueChange?: (value: boolean) => void;

  /**
   * The label of the button.
   */
  label?: string | number;

  /**
   * The size of the button.
   */
  size?: ToggleButtonSize;
}

export const ToggleButton: React.FC<ToggleButtonProps> = forwardRef<
  HTMLInputElement,
  ToggleButtonProps
>(function ToggleButton(
  {
    label,
    value,
    size = "medium",
    onValueChange,
    onChange,
    disabled,
    ...inputProps
  },
  ref,
) {
  const id = useId();

  const onChangeHandler = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (ev) => {
      onChange?.(ev);
      onValueChange?.(!value);
    },
    [onChange, onValueChange, value],
  );

  return (
    <div
      className={cx(
        styles.toggleButton,
        styles[size],
        value && styles.selected,
        disabled && styles.disabled,
      )}
    >
      <input
        type={"checkbox"}
        onChange={onChangeHandler}
        disabled={disabled}
        checked={value}
        ref={ref}
        id={id}
        value={label}
        {...inputProps}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
});
