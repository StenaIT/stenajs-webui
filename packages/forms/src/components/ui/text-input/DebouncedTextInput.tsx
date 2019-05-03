import * as React from "react";
import { useCallback } from "react";
import { Debounce } from "../../../util/events/Debounce";
import { SimpleTextInput, SimpleTextInputProps } from "./SimpleTextInput";

export interface DebouncedTextInputProps extends SimpleTextInputProps {
  debouncedOnChange?: (value: string) => void;
}

export const DebouncedTextInput: React.FC<DebouncedTextInputProps> = ({
  value,
  onChange,
  debouncedOnChange,
  ...simpleTextInputProps
}) => {
  const onChangeHandler = useCallback(
    (value: string) => {
      if (onChange) {
        onChange(value);
      }
    },
    [onChange]
  );

  const debouncedOnChangeHandler = useCallback(
    (value: string) => {
      if (debouncedOnChange) {
        debouncedOnChange(value);
      }
    },
    [debouncedOnChange]
  );

  return (
    <Debounce func={debouncedOnChangeHandler}>
      {(dbOnChange: (v: string) => void) => (
        <SimpleTextInput
          {...simpleTextInputProps}
          value={value}
          onChange={v => {
            onChangeHandler(v);
            dbOnChange(v);
          }}
        />
      )}
    </Debounce>
  );
};
