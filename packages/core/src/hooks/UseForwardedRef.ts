import {
  MutableRefObject,
  RefCallback,
  RefObject,
  useEffect,
  useRef,
} from "react";

export const useForwardedRef = <T>(
  ref: RefCallback<T> | MutableRefObject<T> | null
): RefObject<T> => {
  const innerRef = useRef<T>(null) as MutableRefObject<T>;

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  });

  return innerRef;
};
