import { ButtonElementProps, Text } from "@stenajs-webui/core";
import { forwardRef, useCallback } from "react";
import * as React from "react";
import cx from "classnames";
import { width, WidthProps } from "styled-system";
import styles from "./ToggleButton.module.css";
import { styled } from "../../../styled";

export type ToggleButtonSize = "small" | "medium" | "large";

export interface ToggleButtonProps
  extends WidthProps,
    Omit<ButtonElementProps, "value"> {
  /**
   * The label of the button.
   */
  label?: string | number;

  /**
   * The pressed state change handler.
   */
  onValueChange?: (value: boolean) => void;

  /**
   * If true, the button will display as pressed.
   */
  value?: boolean;

  /**
   * The size of the button.
   */
  size?: ToggleButtonSize;

  /**
   * If true, the button will be disabled.
   */
  disabled?: boolean;
}

const Button = styled.button(width);

export const ToggleButton: React.FC<ToggleButtonProps> = forwardRef<
  HTMLButtonElement,
  ToggleButtonProps
>(function ToggleButton(
  {
    label,
    value,
    size = "medium",
    onValueChange,
    disabled,
    onClick,
    ...buttonProps
  },
  ref
) {
  const handleClick = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(ev);
      onValueChange?.(!value);
    },
    [onClick, onValueChange, value]
  );

  return (
    <Button
      aria-pressed={value}
      className={cx(styles.toggleButton, styles[size], value && styles.pressed)}
      onClick={handleClick}
      disabled={disabled}
      ref={ref}
      {...buttonProps}
    >
      <Text size={"small"} className={styles.label}>
        {label}
      </Text>
    </Button>
  );
});
