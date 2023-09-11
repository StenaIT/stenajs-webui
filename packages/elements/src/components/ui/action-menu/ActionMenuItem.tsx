import * as React from "react";
import { forwardRef } from "react";
import { useActionMenuLogic } from "./UseActionMenuLogic";
import { MenuButton, MenuButtonProps } from "../buttons/menu-button/MenuButton";

export interface ActionMenuItemProps
  extends Omit<
    MenuButtonProps,
    "children" | "expandable" | "expanded" | "selected"
  > {
  disableCloseOnClick?: boolean;
}

export const ActionMenuItem = forwardRef<
  HTMLButtonElement,
  ActionMenuItemProps
>(function ActionMenuItem(
  { leftIcon, label, className, onClick, disableCloseOnClick, ...props },
  ref
) {
  const { onClickHandler, onKeyDown, innerRef } = useActionMenuLogic(
    { disableCloseOnClick, onClick },
    ref
  );

  return (
    <MenuButton
      label={label}
      leftIcon={leftIcon}
      expandable={false}
      onKeyDown={onKeyDown}
      onClick={props.disabled ? undefined : onClickHandler}
      ref={innerRef}
    />
  );
});
