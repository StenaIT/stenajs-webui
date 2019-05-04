import * as React from 'react';
import { useEffect, useRef } from 'react';

export const useOnClickOutside = (
  ref: React.RefObject<any>,
  handler: (event: TouchEvent | MouseEvent) => void,
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

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, []);
};
