import { createContext } from "react";
import { RejectCommand, ResolveCommand } from "./DialogCommands";

export interface DialogContextValue<TResolveValue> {
  resolve: ResolveCommand<TResolveValue>;
  reject: RejectCommand;
}

export const DialogContext = createContext<DialogContextValue<any> | undefined>(
  undefined
);
