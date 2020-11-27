import {
  ChangeEventHandler,
  FocusEventHandler,
  RefObject,
  useCallback,
} from "react";
import { TextInputProps } from "../components/ui/text-input/TextInput";
import { useKeyboardNavigation } from "./UseKeyboardNavigation";
import { useSelectAllOnFocus } from "./UseSelectAllOnFocus";
import { useSelectAllOnMount } from "./UseSelectAllOnMount";

export const useTextInput = (
  ref: RefObject<HTMLInputElement>,
  {
    onEnter,
    onEsc,
    onChange,
    onValueChange,
    selectAllOnFocus,
    selectAllOnMount,
    moveCursorToEndOnMount,
    onDone,
    onMove,
    onFocus,
    onBlur,
    onKeyDown,
    autoFocus,
  }: TextInputProps
): JSX.IntrinsicElements["input"] => {
  const { onFocusHandler } = useSelectAllOnFocus(
    ref,
    onFocus,
    selectAllOnFocus
  );
  useSelectAllOnMount(ref, !!moveCursorToEndOnMount, !!selectAllOnMount);

  const { onKeyDownHandler, wasCancelled } = useKeyboardNavigation(
    ref,
    onKeyDown,
    onEnter,
    onEsc,
    onMove
  );

  const onBlurHandler: FocusEventHandler<HTMLInputElement> = (ev) => {
    if (onDone && !wasCancelled) {
      onDone(ev.target.value ?? "");
    }
    if (onBlur) {
      onBlur(ev);
    }
  };

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      if (onChange) {
        onChange(ev);
      }
      if (onValueChange) {
        onValueChange(ev.target.value);
      }
    },
    [onChange, onValueChange]
  );

  return {
    onBlur: onBlurHandler,
    onChange: onChangeHandler,
    onFocus: onFocusHandler,
    onKeyDown: onKeyDownHandler,
    autoFocus: selectAllOnMount || autoFocus,
  };
};
