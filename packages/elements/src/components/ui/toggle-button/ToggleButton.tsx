import { Box, Clickable, SmallText, useThemeFields } from "@stenajs-webui/core";
import * as React from "react";
import { useMemo } from "react";
import {
  defaultToggleButtonTheme,
  ToggleButtonTheme,
} from "./ToggleButtonTheme";

interface ToggleButtonProps {
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

  /**
   * The theme to use.7
   * @default defaultToggleButtonTheme
   */
  theme?: ToggleButtonTheme;
}

export const ToggleButton = ({
  label,
  pressed,
  first,
  last,
  width,
  onClick,
  theme = defaultToggleButtonTheme,
}: ToggleButtonProps) => {
  const { colors } = useThemeFields(
    {
      colors: {
        backgroundColorPressed: theme.backgroundColorPressed,
        backgroundColorNotPressed: theme.backgroundColorNotPressed,
        textColorPressed: theme.textColorPressed,
        textColorNotPressed: theme.textColorNotPressed,
      },
    },
    [theme]
  );
  const borderRadius = useMemo(
    () =>
      `${first ? "3px" : 0} ${last ? "3px 3px" : "0 0"} ${first ? "3px" : "0"}`,
    [first, last]
  );

  return (
    <Clickable onClick={() => onClick && onClick(!pressed)}>
      <Box
        width={width || theme.width}
        height={theme.height}
        justifyContent={"center"}
        alignItems={"center"}
        background={
          pressed
            ? colors.backgroundColorPressed
            : colors.backgroundColorNotPressed
        }
        borderRadius={borderRadius}
      >
        <SmallText
          color={pressed ? colors.textColorPressed : colors.textColorNotPressed}
        >
          {label}
        </SmallText>
      </Box>
    </Clickable>
  );
};
