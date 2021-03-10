import { RefObject, useEffect } from "react";

export const useSelectAllOnMount = (
  ref: RefObject<HTMLInputElement>,
  moveCursorToEnd: boolean,
  enabled: boolean
) => {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    /*
      `selectionStart`, `selectionEnd` properties and `setSelectionRange` method apply only to inputs of types text, search, URL, tel and password.
      Chrome, starting from version 33, throws an exception while accessing those properties and method on the rest of input types.
      https://html.spec.whatwg.org/multipage/input.html#concept-input-apply
     */
    if (
      ref.current?.type !== "text" &&
      ref.current?.type !== "search" &&
      ref.current?.type !== "url" &&
      ref.current?.type !== "tel" &&
      ref.current?.type !== "password"
    ) {
      return;
    }

    if (enabled) {
      ref.current.setSelectionRange(0, ref.current!.value.length);
    } else if (moveCursorToEnd) {
      ref.current.setSelectionRange(
        ref.current.value.length,
        ref.current.value.length
      );
    }
  }, [moveCursorToEnd, ref, enabled]);
};
