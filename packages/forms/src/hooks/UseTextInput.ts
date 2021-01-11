import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  RefObject,
  useCallback,
} from "react";
import { TextInputProps } from "../components/ui/text-input/TextInput";
import { useKeyboardNavigation } from "./UseKeyboardNavigation";
import { useSelectAllOnMount } from "./UseSelectAllOnMount";

export const useTextInput = (
  ref: RefObject<HTMLInputElement>,
  {
    onEnter,
    onEsc,
    onChange,
    onValueChange,
    selectAllOnMount,
    moveCursorToEndOnMount,
    onDone,
    onMove,
    onFocus,
    onBlur,
    onKeyDown,
    autoFocus,
  }: TextInputProps
): ComponentPropsWithoutRef<"input"> => {
  useSelectAllOnMount(ref, !!moveCursorToEndOnMount, !!selectAllOnMount);

  const {
    onKeyDownHandler,
    onFocusHandler,
    onBlurHandler,
  } = useKeyboardNavigation(
    ref,
    onKeyDown,
    onEnter,
    onEsc,
    onMove,
    onDone,
    onBlur,
    onFocus
  );

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
