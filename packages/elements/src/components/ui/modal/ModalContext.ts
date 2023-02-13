import { createContext } from "react";

export interface ModalContextValue<TResolveValue> {
  resolve: (value?: TResolveValue | undefined) => void;
  reject: (error?: Error) => void;
}

export const ModalContext = createContext<ModalContextValue<any> | undefined>(
  undefined
);
