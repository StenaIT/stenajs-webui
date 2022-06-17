import * as React from "react";

export interface ActionDropdownContextValue {
  close?: () => void;
  open?: () => void;
}

export const ActionMenuContext =
  React.createContext<ActionDropdownContextValue>({});
