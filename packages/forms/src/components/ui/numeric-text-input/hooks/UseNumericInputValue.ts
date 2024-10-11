import { useCallback, useMemo } from "react";
import { ValueAndOnValueChangeProps } from "../../types";
import { NumericTextInputProps } from "../NumericTextInput";
import { parseFloatElseUndefined } from "@stenajs-webui/core";

export type NumericInputValueProps = ValueAndOnValueChangeProps<
  number | undefined
>;

export const useNumericInputValue = (
  value: number | undefined,
  onValueChange?: (value: number | undefined) => void,
): Partial<NumericTextInputProps> => {
  const onValueChangeString = useCallback(
    (newValue: string) => {
      if (onValueChange) {
        if (!newValue) {
          onValueChange(undefined);
        } else {
          const n = parseFloatElseUndefined(newValue);
          if (n !== undefined) {
            onValueChange(n);
          }
        }
      }
    },
    [onValueChange],
  );

  const valueString = useMemo(() => {
    if (value === undefined) {
      return "";
    }
    return String(value);
  }, [value]);

  return {
    onValueChange: onValueChangeString,
    value: valueString,
  };
};
