import { useCallback, useState } from "react";

type BooleanHook = [boolean, () => void, () => void, () => void];

export const useBoolean = (initialValue: boolean): BooleanHook => {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => {
    setValue(true);
  }, [setValue]);

  const setFalse = useCallback(() => {
    setValue(false);
  }, [setValue]);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, [setValue]);

  return [value, setTrue, setFalse, toggle];
};
