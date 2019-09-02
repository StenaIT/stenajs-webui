import * as ReactDOM from "react-dom";
import { RefObject, useEffect } from "react";
import { useBoolean } from "./UseBoolean";
import { useEventListener } from "./UseEventListener";

export const useElementFocus = <TElement extends HTMLElement>(
  ref: RefObject<TElement>
) => {
  const [isInFocus, setIsInFocus, setIsNotInFocus] = useBoolean(false);

  useEffect(() => {
    if (document.activeElement === ReactDOM.findDOMNode(ref.current)) {
      setIsInFocus();
    } else {
      setIsNotInFocus();
    }
  }, [ref, setIsNotInFocus, setIsInFocus]);

  useEventListener(ref, "focus", setIsInFocus);
  useEventListener(ref, "blur", setIsNotInFocus);

  const focus = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const blur = () => {
    if (ref.current) {
      ref.current.blur();
    }
  };

  return { isInFocus, focus, blur };
};
