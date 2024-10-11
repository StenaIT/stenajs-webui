import { RefObject, useEffect, useRef } from "react";

type EventHandler<TEventName extends keyof HTMLElementEventMap> = (
  event: HTMLElementEventMap[TEventName],
) => void;

export const useEventListener = <TEventName extends keyof HTMLElementEventMap>(
  ref: RefObject<HTMLElement>,
  eventName: TEventName,
  handler: EventHandler<TEventName>,
) => {
  // Create a ref that stores handler
  const savedHandler = useRef<EventHandler<TEventName>>();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Make sure element supports addEventListener
    const isSupported = ref.current && ref.current.addEventListener;
    if (!isSupported) return;

    // Create event listener that calls handler function stored in ref
    const eventListener: EventHandler<TEventName> = (event) => {
      if (savedHandler.current) {
        return savedHandler.current(event);
      }
    };

    // Add event listener
    if (!ref.current) {
      return;
    }

    const element = ref.current;
    element.addEventListener(eventName, eventListener);

    // Remove event listener on cleanup
    return () => {
      if (element) {
        element.removeEventListener(eventName, eventListener);
      }
    };
  }, [eventName, ref]); // Re-run if eventName or element changes
};
