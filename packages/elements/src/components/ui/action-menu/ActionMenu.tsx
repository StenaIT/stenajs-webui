import { BoxProps, Column, useThemeFields } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
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
        menuBackground: theme.menuBackground,
      },
    },
    [theme]
  );

  return (
    <Column
      background={colors.menuBackground}
      borderRadius={theme.borderRadius}
      width={width}
      shadow={shadow}
    >
      {top}
      <Column spacing={0.5}>{children}</Column>
    </Column>
  );
};
