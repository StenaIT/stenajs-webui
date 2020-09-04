import { useCallback, useEffect, useRef, useState } from "react";

export interface RevertableValue<TValue> {
  value: TValue;
  setValue: (value: TValue) => void;
  setRevertValue: (revertValue: TValue) => void;
  revert: () => void;
  commit: () => void;
  getValue: () => TValue;
}

export const useRevertableValue = <TValue>(
  initialValue: TValue
): RevertableValue<TValue> => {
  const [value, setValueInternal] = useState<TValue>(initialValue);
  const revertValue = useRef<TValue>(initialValue);
  const valueRef = useRef<TValue>(initialValue);

  const setValue = useCallback(
    (value: TValue) => {
      setValueInternal(value);
      valueRef.current = value;
    },
    [setValueInternal, valueRef]
  );

  useEffect(() => {
    setValue(initialValue);
  }, [setValue, initialValue]);

  const revert = useCallback(() => {
    if (revertValue) {
      setValue(revertValue.current);
    }
  }, [setValue, revertValue]);

  const commit = useCallback(
    (commitValue?: TValue) => {
      revertValue.current = value;
      if (commitValue) {
        setValue(commitValue);
      }
    },
    [value, setValue]
  );

  const setRevertValue = useCallback(
    (value: TValue) => (revertValue.current = value),
    [revertValue]
  );

  const getValue = useCallback(() => valueRef.current, [valueRef]);

  return {
    value,
    setValue,
    setRevertValue,
    revert,
    commit,
    getValue
  };
};
