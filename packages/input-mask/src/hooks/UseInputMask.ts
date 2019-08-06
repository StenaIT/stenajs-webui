import { ChangeEvent, RefObject, useLayoutEffect, useRef } from "react";
import { createTextMaskInputElement } from "text-mask-core";
import {
  InputMask,
  InputMaskPipe,
  InputMaskProvider
} from "../masks/InputMask";

export const useMaskedInput = (
  inputRef: RefObject<HTMLInputElement>,
  onChange: ((ev: ChangeEvent<HTMLInputElement>) => void) | undefined,
  mask: InputMask | InputMaskProvider,
  pipe?: InputMaskPipe,
  initialValue: string = "",
  guide: boolean = false,
  keepCharPositions: boolean = false,
  placeholderChar: string = "\u2000",
  showMask: boolean = true
) => {
  const textMask = useRef(null);

  useLayoutEffect(() => {
    if (!inputRef.current) return;

    textMask.current = createTextMaskInputElement({
      guide,
      inputElement: inputRef.current,
      keepCharPositions,
      mask,
      pipe,
      placeholderChar,
      showMask
    });

    (textMask.current as any).update(initialValue);
  }, [
    inputRef,
    guide,
    keepCharPositions,
    mask,
    pipe,
    placeholderChar,
    showMask,
    initialValue
  ]);

  return {
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      if (textMask.current) {
        (textMask.current as any).update();
      }

      if (typeof onChange === "function") {
        onChange(event);
      }
    }
  };
};
