import {
  KeyboardEvent,
  KeyboardEventHandler,
  RefObject,
  useCallback,
  useRef,
} from "react";

export type MoveDirection = "right" | "left" | "down" | "up";

export const useKeyboardNavigation = (
  ref: RefObject<HTMLInputElement>,
  /**
   * User-provided onKeyDown. Internal handler should forward calls to this.
   * */
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>,
  onEnter?: () => void,
  onEsc?: () => void,
  /**
   * onMove callback, triggered when user tries to move outside of field using arrow keys, tab or shift+tab.
   * */
  onMove?: (direction: MoveDirection) => void
) => {
  const wasCancelledRef = useRef(false);

  const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      const { key } = ev;
      if (onEnter && key === "Enter") {
        ref.current!.blur();
        onEnter();
      } else if (onEsc && key === "Escape") {
        wasCancelledRef.current = true;
        onEsc();

        ev.preventDefault();
        ev.stopPropagation();
      } else if (onMove) {
        const blurMoveAndCancel = (
          direction: MoveDirection,
          e: KeyboardEvent<HTMLInputElement>
        ) => {
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
    [onEsc, onMove, onKeyDown, ref, onEnter]
  );

  return {
    onKeyDownHandler,
    wasCancelled: wasCancelledRef.current,
  };
};
