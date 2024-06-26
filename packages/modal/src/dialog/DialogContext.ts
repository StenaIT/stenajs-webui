import { createContext } from "react";
import { RejectCommand, ResolveCommand } from "./DialogCommands";

export interface DialogContextValue<TResolveValue> {
  resolve: ResolveCommand<TResolveValue>;
  reject: RejectCommand;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

export const DialogContext = createContext<DialogContextValue<any> | undefined>(
  undefined
);
