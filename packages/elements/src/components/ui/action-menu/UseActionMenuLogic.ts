import { MouseEventHandler, useCallback, useContext } from "react";
import { ActionMenuContext } from "./ActionMenuContext";
import { useFocusManager } from "@react-aria/focus";
import * as React from "react";
import { ActionMenuItemProps } from "./ActionMenuItem";
import { useForwardedRef } from "@stenajs-webui/core";

interface Props extends Pick<ActionMenuItemProps, "disableCloseOnClick"> {
  onClick?: React.MouseEventHandler;
}

export const useActionMenuLogic = <TElement extends HTMLElement>(
  { disableCloseOnClick, onClick }: Props,
  ref: React.Ref<TElement>
) => {
  const { close } = useContext(ActionMenuContext);
  const innerRef = useForwardedRef<TElement | null>(ref);

  const onClickHandler = useCallback<MouseEventHandler<TElement>>(
    (ev) => {
      if (!disableCloseOnClick) {
        close?.();
      }
      onClick?.(ev);
    },
    [onClick, close, disableCloseOnClick]
  );

  const focusManager = useFocusManager();
  const onKeyDown = (event: React.KeyboardEvent<TElement>) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        focusManager?.focusNext({ wrap: true });
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        focusManager?.focusPrevious({ wrap: true });
        break;
      case " ":
        event.preventDefault();
        innerRef.current?.click();
    }
  };

  return {
    onClickHandler,
    onKeyDown,
    innerRef,
  };
};
