import { RefObject, useEffect, useMemo, useState } from "react";

export const useOnScreen = (
  ref: RefObject<Element>,
  options?: IntersectionObserverInit
) => {
  const [isVisible, setIsVisible] = useState(false);

  const { rootMargin, root, threshold } = options || {};

  const observer = useMemo(() => {
    return new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        rootMargin,
        root,
        threshold,
      }
    );
  }, [setIsVisible, rootMargin, root, threshold]);

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [observer, ref]);

  return isVisible;
};
