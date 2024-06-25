import * as React from "react";
import { useEffect, useRef } from "react";

export const useOnClickOutside = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.RefObject<any>,
  handler: (event: TouchEvent | MouseEvent) => void,
  options?: AddEventListenerOptions
) => {
  const eventHandler = useRef<(event: TouchEvent | MouseEvent) => void>(() => {
    return;
  });

  useEffect(() => {
    eventHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (event: TouchEvent | MouseEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      eventHandler.current(event);
    };

    document.addEventListener("mousedown", listener, options);
    document.addEventListener("touchstart", listener, options);

    return () => {
      document.removeEventListener("mousedown", listener, options);
      document.removeEventListener("touchstart", listener, options);
    };
  }, [ref, options]);
};
