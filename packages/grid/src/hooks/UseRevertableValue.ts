import { useCallback, useEffect, useState } from 'react';

export interface RevertableValue<TValue> {
  value: TValue;
  setValue: (value: TValue) => void;
  setRevertValue: (revertValue: TValue) => void;
  revert: () => void;
  commit: () => void;
}

export const useRevertableValue = <TValue>(
  initialValue: TValue,
): RevertableValue<TValue> => {
  const [value, setValue] = useState<TValue>(initialValue);
  const [revertValue, setRevertValue] = useState<TValue>(initialValue);

  useEffect(
    () => {
      setValue(initialValue);
    },
    [setValue, initialValue],
  );

  const revert = useCallback(
    () => {
      if (revertValue) {
        setValue(revertValue);
      }
    },
    [setValue, revertValue],
  );

  const commit = useCallback(
    (commitValue?: TValue) => {
      setRevertValue(value);
      if (commitValue) {
        setValue(commitValue);
      }
    },
    [value, setValue],
  );

  return {
    value,
    setValue,
    setRevertValue,
    revert,
    commit,
  };
};
