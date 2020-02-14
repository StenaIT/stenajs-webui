import { FocusEventHandler, RefObject } from "react";

export const useSelectAllOnFocus = (
  ref: RefObject<HTMLInputElement>,
  onFocus: FocusEventHandler<HTMLInputElement>,
  enabled: boolean
) => {
  const onFocusHandler: FocusEventHandler<HTMLInputElement> = ev => {
    if (ref.current && ref.current.type !== "number") {
      if (enabled) {
        ref.current!.setSelectionRange(0, ref.current!.value.length);
      } else {
        ref.current!.setSelectionRange(
          ref.current!.value.length,
          ref.current!.value.length
        );
      }
    }
    if (onFocus) {
      onFocus(ev);
    }
  };

  return {
    onFocusHandler
  };
};
