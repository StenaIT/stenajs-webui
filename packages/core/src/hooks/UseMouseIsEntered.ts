import { useBoolean, useEventListener } from "@stenajs-webui/core";
import { RefObject } from "react";

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
