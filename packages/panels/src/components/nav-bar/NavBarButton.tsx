import { useThemeFields } from "@stenajs-webui/core";
import { ButtonProps, FlatButton } from "@stenajs-webui/elements";
import * as React from "react";
import {
  defaultNavBarButtonTheme,
  NavBarButtonTheme
} from "./NavBarButtonTheme";

export interface NavBarButtonProps extends ButtonProps {
  selected?: boolean;
  theme?: NavBarButtonTheme;
}

export const NavBarButton: React.FC<NavBarButtonProps> = ({
  selected,
  theme = defaultNavBarButtonTheme,
  ...buttonProps
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
        textColorSelected: theme.textColorSelected,
        textColorNotSelected: theme.textColorNotSelected
      }
    },
    [theme]
  );

  const textColor = selected
    ? colors.textColorSelected
    : colors.textColorNotSelected;

  return (
    <FlatButton buttonTheme={theme} textColor={textColor} {...buttonProps} />
  );
};
