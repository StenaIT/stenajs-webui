import * as React from 'react';
import { useEffect, useRef } from 'react';

export const useMultiOnClickOutside = (
  refs: Array<React.RefObject<any>>,
  handler: (event: TouchEvent | MouseEvent) => void,
) => {
  const eventHandler = useRef<(event: TouchEvent | MouseEvent) => void>(() => {
    return;
  });

  useEffect(
    () => {
      eventHandler.current = handler;
    },
    [handler],
  );

  useEffect(
    () => {
      const listener = (event: TouchEvent | MouseEvent) => {
        // Do nothing if clicking ref's element or descendent elements

        const allNotContains = refs.every(
          ref => ref.current && !ref.current.contains(event.target),
        );

        if (!allNotContains) {
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...refs],
  );
};
