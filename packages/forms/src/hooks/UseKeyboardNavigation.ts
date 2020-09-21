import {
  KeyboardEvent,
  KeyboardEventHandler,
  RefObject,
  useCallback,
  useState,
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
  const [wasCancelled, setWasCancelled] = useState(false);

  const blurMoveAndCancel = useCallback(
    (direction: MoveDirection, e: KeyboardEvent<HTMLInputElement>) => {
      ref.current!.blur();
      if (onMove) {
        onMove(direction);
      }
      e.preventDefault();
      e.stopPropagation();
    },
    [onMove, ref]
  );

  const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      const { key } = ev;
      if (key === "Enter") {
        ref.current!.blur();
        if (onEnter) {
          onEnter();
        }
      } else if (onEsc && key === "Escape") {
        setWasCancelled(true);
        setTimeout(() => {
          onEsc(); // Do this after set state is done. Is there a better way?
        }, 100);

        ev.preventDefault();
        ev.stopPropagation();
      } else if (onMove) {
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
    [onEsc, onMove, onKeyDown, ref, onEnter, blurMoveAndCancel]
  );

  return {
    onKeyDownHandler,
    wasCancelled,
  };
};
