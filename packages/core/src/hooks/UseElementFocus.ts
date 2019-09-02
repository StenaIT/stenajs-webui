import * as ReactDOM from "react-dom";
import { RefObject, useEffect } from "react";
import { useBoolean } from "./UseBoolean";
import { useEventListener } from "./UseEventListener";

export const useElementFocus = <TElement extends HTMLElement>(
  ref: RefObject<TElement>
) => {
  const [isInFocus, setIsInFocus, setIsNotInFocus] = useBoolean(false);

  useEffect(() => {
    console.log(
      "ReactDOM.findDOMNode(ref.current)",
      ReactDOM.findDOMNode(ref.current)
    );
    console.log("document.activeElement", document.activeElement);
    if (document.activeElement === ReactDOM.findDOMNode(ref.current)) {
      setIsInFocus();
    } else {
      setIsNotInFocus();
    }
  }, [ref, setIsInFocus]);

  console.log("ref", ref.current);

  useEventListener(ref, "focus", () => {
    console.log("---------------- got focus event!!!!!");
    setIsInFocus();
  });
  useEventListener(ref, "blur", () => {
    console.log("got blur event");
    setIsNotInFocus();
  });

  const focus = () => {
    console.log("focusing on element");
    if (ref.current) {
      ref.current.focus();
    }
  };

  const blur = () => {
    console.log("blurring element");
    if (ref.current) {
      ref.current.blur();
    }
  };

  return { isInFocus, focus, blur };
};
