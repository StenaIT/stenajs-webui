import { createContext } from "react";
import { RejectCommand, ResolveCommand } from "./ModalCommands";

export interface ModalContextValue<TResolveValue> {
  resolve: ResolveCommand<TResolveValue>;
  reject: RejectCommand;
}

export const ModalContext = createContext<ModalContextValue<any> | undefined>(
  undefined
);
