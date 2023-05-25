import styled from "@emotion/styled";
import { ButtonElementProps, Text } from "@stenajs-webui/core";
import { forwardRef, useCallback } from "react";
import * as React from "react";
import cx from "classnames";
import { width, WidthProps } from "styled-system";
import styles from "./ToggleButton.module.css";

export type ToggleButtonSize = "small" | "medium" | "large";

export interface ToggleButtonProps extends WidthProps, ButtonElementProps {
  /**
   * The label of the button.
   */
  label?: string | number;

  /**
   * The pressed state change handler.
   */
  onValueChange?: (pressed: boolean) => void;

  /**
   * If true, the button will display as pressed.
   */
  pressed?: boolean;

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
>(function ToggleButton({
  label,
  pressed,
  size = "medium",
  onValueChange,
  disabled,
  onClick,
  ...buttonProps
}) {
  const handleClick = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(ev);
      onValueChange?.(!pressed);
    },
    [onClick, onValueChange, pressed]
  );

  return (
    <Button
      className={cx(
        styles.toggleButton,
        styles[size],
        pressed && styles.pressed,
        disabled && styles.disabled
      )}
      onClick={handleClick}
      disabled={disabled}
      {...buttonProps}
    >
      <Text size={"small"} className={styles.label}>
        {label}
      </Text>
    </Button>
  );
});
