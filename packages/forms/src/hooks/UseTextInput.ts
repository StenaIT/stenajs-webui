import {
  ChangeEvent,
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
  KeyboardEventHandler,
  RefObject,
  useCallback,
} from "react";
import { TextInputVariant } from "../components/ui/text-input/TextInput";
import {
  MoveDirection,
  TextInputElement,
  useKeyboardNavigation,
} from "./UseKeyboardNavigation";
import { useSelectAllOnMount } from "./UseSelectAllOnMount";
import { FullOnChangeProps } from "../components/ui/types";

interface UseTextInputOptions<TElement extends TextInputElement>
  extends FullOnChangeProps<string, ChangeEvent<TElement>> {
  wrapperStyle?: CSSProperties;
  wrapperClassName?: string;
  variant?: TextInputVariant;
  hideBorder?: boolean;
  selectAllOnMount?: boolean;
  moveCursorToEndOnMount?: boolean;
  onDone?: (value: string) => void;
  onEnter?: () => void;
  onEsc?: () => void;
  autoFocus?: boolean;
  /** onMove callback, triggered when user tries to move outside of field using arrow keys, tab or shift+tab. */
  onMove?: (direction: MoveDirection) => void;
  onFocus?: FocusEventHandler<TElement>;
  onBlur?: FocusEventHandler<TElement>;
  onKeyDown?: KeyboardEventHandler<TElement>;
}

interface UseTextInputHookResult<TElement extends TextInputElement> {
  autoFocus?: boolean;
  onChange: ChangeEventHandler<TElement>;
  onFocus: FocusEventHandler<TElement>;
  onBlur: FocusEventHandler<TElement>;
  onKeyDown: KeyboardEventHandler<TElement>;
}

export const useTextInput = <TElement extends TextInputElement>(
  ref: RefObject<TElement>,
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
  }: UseTextInputOptions<TElement>
): UseTextInputHookResult<TElement> => {
  useSelectAllOnMount(ref, !!moveCursorToEndOnMount, !!selectAllOnMount);

  const { onKeyDownHandler, onFocusHandler, onBlurHandler } =
    useKeyboardNavigation<TElement>(
      ref,
      onKeyDown,
      onEnter,
      onEsc,
      onMove,
      onDone,
      onBlur,
      onFocus
    );

  const onChangeHandler = useCallback<ChangeEventHandler<TElement>>(
    (ev) => {
      onChange?.(ev);
      onValueChange?.(ev.target.value);
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
