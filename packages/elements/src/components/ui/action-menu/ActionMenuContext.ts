import * as React from "react";
import { ActionMenuTheme, defaultActionMenuTheme } from "./ActionMenuTheme";

export interface ActionDropdownContextValue {
  close?: () => void;
  open?: () => void;
  theme: ActionMenuTheme;
}

export const ActionMenuContext = React.createContext<ActionDropdownContextValue>(
  { theme: defaultActionMenuTheme }
);
