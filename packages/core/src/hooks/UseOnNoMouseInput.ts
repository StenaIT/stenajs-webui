import { debounce } from "lodash-es";
import { useEffect, useRef } from "react";

const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];

export const useOnNoMouseMovement = (callback: () => void, delay: number) => {
  const eventHandler = useRef<(event: Event) => void>(() => {
    return;
  });

  useEffect(() => {
    eventHandler.current = callback;
  }, [callback]);

  useEffect(() => {
    const onIdleChange = debounce(eventHandler.current, delay);
    events.forEach((event) => window.addEventListener(event, onIdleChange));

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, onIdleChange),
      );
    };
  }, [delay]);
};
