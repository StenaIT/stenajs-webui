import { FocusEventHandler, RefObject, useCallback } from "react";

export const useSelectAllOnFocus = (
  ref: RefObject<HTMLInputElement>,
  onFocus?: FocusEventHandler<HTMLInputElement>,
  enabled?: boolean
) => {
  const onFocusHandler: FocusEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      if (onFocus) {
        onFocus(ev);
      }

      if (!ref.current) {
        return;
      }

      if (ref.current?.type === "number" || ref.current?.type === "date") {
        return;
      }

      if (enabled) {
        ref.current!.setSelectionRange(0, ref.current!.value.length);
      } else {
        ref.current!.setSelectionRange(
          ref.current!.value.length,
          ref.current!.value.length
        );
      }
    },
    [ref, onFocus, enabled]
  );

  return {
    onFocusHandler,
  };
};
