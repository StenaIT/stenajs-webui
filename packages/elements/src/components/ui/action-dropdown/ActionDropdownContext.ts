import * as React from "react";
import {
  ActionDropdownTheme,
  defaultActionDropdownTheme
} from "./ActionDropdownTheme";

export interface ActionDropdownContextValue {
  close?: () => void;
  open?: () => void;
  theme: ActionDropdownTheme;
}

export const ActionDropdownContext = React.createContext<
  ActionDropdownContextValue
>({ theme: defaultActionDropdownTheme });
