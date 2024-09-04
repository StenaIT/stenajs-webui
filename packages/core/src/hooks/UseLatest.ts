import React, { MutableRefObject } from "react";

export const useLatest = <T>(value: T): MutableRefObject<T> => {
  const ref = React.useRef(value);
  ref.current = value;
  return ref;
};
