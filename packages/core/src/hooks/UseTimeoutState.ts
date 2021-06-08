import { useCallback, useEffect, useRef, useState } from "react";

export const useTimeoutState = <S>(
  initialValue: S,
  defaultTimeout: number,
  clearTimeoutOnSetValue = true
): [S, (v: S) => void] => {
  const [value, setValue] = useState<S>(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const wrappedSetter = useCallback(
    (newValue: S, timeout = defaultTimeout) => {
      setValue(newValue);
      if (clearTimeoutOnSetValue) {
        clearTimeout(timeoutRef.current!);
      }
      timeoutRef.current = setTimeout(() => setValue(initialValue), timeout);
    },
    [defaultTimeout, clearTimeoutOnSetValue, initialValue]
  );

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current!);
    };
  }, []);

  return [value, wrappedSetter];
};
