import * as React from "react";

export interface ActionDropdownContextValue {
  close?: () => void;
  open?: () => void;
}

export const ActionDropdownContext = React.createContext<
  ActionDropdownContextValue
>({});
