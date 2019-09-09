import { useCallback, useState } from "react";

type Value = boolean;
type SetTrue = () => void;
type SetFalse = () => void;
type ToggleValue = () => void;
type BooleanHook = [Value, SetTrue, SetFalse, ToggleValue];

export const useBoolean = (initialValue: Value): BooleanHook => {
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
