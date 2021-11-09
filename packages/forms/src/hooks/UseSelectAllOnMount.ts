import { RefObject, useEffect } from "react";

export function elementHasSelectionRange(
  element: HTMLInputElement | HTMLTextAreaElement
): boolean {
  if (element.tagName === "TEXTAREA") {
    return true;
  }

  if (
    element.tagName === "INPUT" &&
    (element.type === "text" ||
      element.type === "search" ||
      element.type === "url" ||
      element.type === "tel" ||
      element.type === "password")
  ) {
    return true;
  }

  return false;
}

export const useSelectAllOnMount = (
  ref: RefObject<HTMLInputElement | HTMLTextAreaElement>,
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
    if (!elementHasSelectionRange(ref.current)) {
      return;
    }

    if (enabled) {
      ref.current.setSelectionRange(0, ref.current.value.length);
    } else if (moveCursorToEnd) {
      ref.current.setSelectionRange(
        ref.current.value.length,
        ref.current.value.length
      );
    }
  }, [moveCursorToEnd, ref, enabled]);
};
