import { BoxProps, Column } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import { ActionMenuTheme, defaultActionMenuTheme } from "./ActionMenuTheme";
import { FocusScope } from "@react-aria/focus";

export interface ActionMenuProps {
  top?: ReactNode;
  theme?: ActionMenuTheme;
  width?: string;
  shadow?: BoxProps["shadow"];
  trapFocus?: boolean;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  theme = defaultActionMenuTheme,
  top,
  children,
  width = "200px",
  shadow,
  trapFocus,
}) => {
  return (
    <FocusScope contain={trapFocus}>
      <Column
        background={theme.menuBackground}
        borderRadius={theme.borderRadius}
        width={width}
        shadow={shadow}
      >
        {top}
        <Column>{children}</Column>
      </Column>
    </FocusScope>
  );
};
