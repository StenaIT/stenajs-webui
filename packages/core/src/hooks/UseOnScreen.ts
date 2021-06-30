import { RefObject, useEffect, useMemo, useState } from "react";

export const useOnScreen = (
  ref: RefObject<Element>,
  options?: IntersectionObserverInit
) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const { rootMargin, root, threshold } = options || {};

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        {
          rootMargin,
          root,
          threshold,
        }
      ),
    [setIntersecting, rootMargin, root, threshold]
  );

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [observer, ref]);

  return isIntersecting;
};
