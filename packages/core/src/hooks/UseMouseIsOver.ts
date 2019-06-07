import { RefObject } from "react";
import { useBoolean } from "./UseBoolean";
import { useEventListener } from "./UseEventListener";

export const useMouseIsOver = <TElement extends HTMLElement>(
  ref: RefObject<TElement>
) => {
  const [mouseIsOver, setMouseIsOver, setMouseIsNotOver] = useBoolean(false);

  useEventListener(ref, "mouseover", setMouseIsOver);
  useEventListener(ref, "mouseout", setMouseIsNotOver);

  return mouseIsOver;
};
