import { useContext } from "react";
import { ModalContext, ModalContextValue } from "./ModalContext";

export const useModalPromise = <
  TResolveValue = void
>(): ModalContextValue<TResolveValue> => {
  const context = useContext(ModalContext);
  if (context == null) {
    throw new Error("useModalPromise is being used outside of useModal.");
  }
  return context as ModalContextValue<TResolveValue>;
};
