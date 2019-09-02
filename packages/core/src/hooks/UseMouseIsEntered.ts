import { RefObject } from "react";
import { useBoolean } from "./UseBoolean";
import { useEventListener } from "./UseEventListener";

export const useMouseIsEntered = <TElement extends HTMLElement>(
  ref: RefObject<TElement>
) => {
  const [mouseIsEntered, setMouseIsEntered, setMouseIsNotEntered] = useBoolean(
    false
  );

  useEventListener(ref, "mouseenter", setMouseIsEntered);
  useEventListener(ref, "mouseleave", setMouseIsNotEntered);

  return mouseIsEntered;
};
