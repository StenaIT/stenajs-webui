import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { Instance } from "tippy.js";
import { MutableRefObject, useRef } from "react";

export type TippyInstance = Instance;

export type TippyElement<TElement extends HTMLElement> = TElement & {
  _tippy: TippyInstance;
};

export type TippyCallbackRef<TElement extends HTMLElement> = (
  element: TippyElement<TElement> | null
) => void;

export const useTippyInstance = <TElement extends HTMLElement>(): [
  TippyCallbackRef<TElement>,
  MutableRefObject<TippyInstance | undefined>
] => {
  const tippyRef = useRef<TippyInstance>();

  return [
    (element: TippyElement<TElement> | null) => {
      tippyRef.current = element?._tippy ?? undefined;
    },
    tippyRef
  ];
};
