import { useEffect, useState } from "react";

export const useDelayedFalse = (value: boolean, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<boolean>(value);

  useEffect(() => {
    if (value) {
      setDebouncedValue(true);
    }

    const handler = setTimeout(() => {
      if (!value) {
        setDebouncedValue(value);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
