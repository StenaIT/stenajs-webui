import { useContext } from "react";
import { DialogContext, DialogContextValue } from "./DialogContext";

export const useDialogPromise = <
  TResolveValue = void
>(): DialogContextValue<TResolveValue> => {
  const context = useContext(DialogContext);
  if (context == null) {
    throw new Error("useDialogPromise is being used outside of dialog.");
  }
  return context as DialogContextValue<TResolveValue>;
};
