import { useContext } from "react";
import { ModalContext, ModalContextValue } from "./ModalContext";

export const useModalPromise = <
  TResolveValue
>(): ModalContextValue<TResolveValue> => {
  const context = useContext(ModalContext);
  if (context == null) {
    throw new Error("useDialogPromise is being used outside of useDialog.");
  }
  return context as ModalContextValue<TResolveValue>;
};
