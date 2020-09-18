import { BoxProps, Column, useThemeFields } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode, useMemo } from "react";
import { ActionMenuTheme, defaultActionMenuTheme } from "./ActionMenuTheme";

export interface ActionMenuProps {
  top?: ReactNode;
  theme?: ActionMenuTheme;
  width?: string;
  shadow?: BoxProps["shadow"];
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  theme = defaultActionMenuTheme,
  top,
  children,
  width = "200px",
  shadow,
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
        borderColor: theme.borderColor,
        borderColorFocus: theme.borderColorFocus,
        menuBackground: theme.menuBackground,
      },
    },
    [theme]
  );

  const hoverBorder = useMemo(() => `1px solid ${colors.borderColorFocus}`, [
    colors.borderColorFocus,
  ]);

  return (
    <Column
      background={colors.menuBackground}
      borderColor={colors.borderColor}
      hoverBorder={hoverBorder}
      focusBorder={hoverBorder}
      focusWithinBorder={hoverBorder}
      borderRadius={theme.borderRadius}
      borderWidth={1}
      borderStyle={"solid"}
      width={width}
      shadow={shadow}
    >
      {top}
      <Column spacing={0.5}>{children}</Column>
    </Column>
  );
};
