import { Box, Clickable, Text } from "@stenajs-webui/core";
import * as React from "react";
import { useMemo } from "react";
import cx from "classnames";
import styles from "./ToggleButton.module.css";

export interface ToggleButtonProps {
  /**
   * The label of the button.
   */
  label?: string | number;

  /**
   * The click handler.
   */
  onClick?: (pressed: boolean) => void;

  /**
   * If true, the button will display as pressed.
   */
  pressed?: boolean;

  /**
   * If true, the button will have rounded corners on the left side.
   */
  first?: boolean;

  /**
   * If true, the button will have rounded corners on the right side.
   */
  last?: boolean;

  /**
   * The width of the button.
   * @default Width specified in theme.
   */
  width?: string;
}

export const ToggleButton = ({
  label,
  pressed,
  first,
  last,
  width,
  onClick,
}: ToggleButtonProps) => {
  const borderRadius = useMemo(
    () =>
      `${first ? "3px" : 0} ${last ? "3px 3px" : "0 0"} ${first ? "3px" : "0"}`,
    [first, last]
  );

  return (
    <Clickable onClick={() => onClick && onClick(!pressed)}>
      <Box
        className={cx(styles.toggleButton, pressed && styles.pressed)}
        width={width}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={borderRadius}
      >
        <Text size={"small"} className={styles.label}>
          {label}
        </Text>
      </Box>
    </Clickable>
  );
};
