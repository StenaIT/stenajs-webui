import {
  FocusEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  RefObject,
  useCallback,
  useRef,
} from "react";

export type MoveDirection = "right" | "left" | "down" | "up";
export type TextInputElement = HTMLTextAreaElement | HTMLInputElement;

export const useKeyboardNavigation = <TElement extends TextInputElement>(
  ref: RefObject<TElement>,
  /**
   * User-provided onKeyDown. Internal handler should forward calls to this.
   * */
  onKeyDown: KeyboardEventHandler<TElement> | undefined,
  onEnter: (() => void) | undefined,
  onEsc: (() => void) | undefined,
  /**
   * onMove callback, triggered when user tries to move outside of field using arrow keys, tab or shift+tab.
   * */
  onMove: ((direction: MoveDirection) => void) | undefined,
  onDone: ((value: string) => void) | undefined,
  onBlur: FocusEventHandler<TElement> | undefined,
  onFocus: FocusEventHandler<TElement> | undefined,
) => {
  const wasHandled = useRef(false);

  const onBlurHandler: FocusEventHandler<TElement> = (ev) => {
    if (!wasHandled.current) {
      onDone?.(ev.target.value ?? "");
    }
    onBlur?.(ev);
  };

  const onFocusHandler: FocusEventHandler<TElement> = (ev) => {
    wasHandled.current = false;
    onFocus?.(ev);
  };

  const onKeyDownHandler: KeyboardEventHandler<TElement> = useCallback(
    (ev) => {
      const { key } = ev;
      if (key === "Enter") {
        wasHandled.current = true;
        onEnter?.();
        onDone?.(ev.currentTarget.value ?? "");
      } else if (key === "Escape") {
        wasHandled.current = true;
        onEsc?.();
        ev.preventDefault();
        ev.stopPropagation();
      } else if (onMove) {
        const blurMoveAndCancel = (
          direction: MoveDirection,
          e: KeyboardEvent<TElement>,
        ) => {
          wasHandled.current = true;
          ref.current!.blur();
          onMove(direction);
          e.preventDefault();
          e.stopPropagation();
        };

        if (ev.shiftKey && key === "Tab") {
          blurMoveAndCancel("left", ev);
        } else if (key === "Tab") {
          blurMoveAndCancel("right", ev);
        } else if (key === "ArrowUp") {
          blurMoveAndCancel("up", ev);
        } else if (key === "ArrowDown") {
          blurMoveAndCancel("down", ev);
        } else if (key === "ArrowRight") {
          if (ref.current!.value.length === ref.current!.selectionStart) {
            blurMoveAndCancel("right", ev);
          }
        } else if (key === "ArrowLeft") {
          if (ref.current!.selectionStart === 0) {
            blurMoveAndCancel("left", ev);
          }
        }
      }

      if (onKeyDown) {
        onKeyDown(ev);
      }
    },
    [onEsc, onMove, onKeyDown, ref, onEnter, onDone],
  );

  return {
    onKeyDownHandler,
    onBlurHandler,
    onFocusHandler,
  };
};
