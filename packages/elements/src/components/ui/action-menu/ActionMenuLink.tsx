import * as React from "react";
import { forwardRef } from "react";
import { useActionMenuLogic } from "./UseActionMenuLogic";
import {
  MenuButtonLink,
  MenuButtonLinkProps,
} from "../buttons/menu-button/MenuButtonLink";

export interface ActionMenuLinkProps
  extends Omit<
    MenuButtonLinkProps,
    "children" | "expandable" | "expanded" | "selected"
  > {
  disabled?: boolean;
  disableCloseOnClick?: boolean;
}

export const ActionMenuLink = forwardRef<
  HTMLAnchorElement,
  ActionMenuLinkProps
>(function ActionMenuLink(
  { disabled, onClick, disableCloseOnClick, ...props },
  ref: React.Ref<HTMLAnchorElement>
) {
  const { onClickHandler, onKeyDown, innerRef } = useActionMenuLogic(
    { disableCloseOnClick, onClick },
    ref
  );

  return (
    <MenuButtonLink
      onKeyDown={onKeyDown}
      disabled={disabled}
      onClick={disabled ? undefined : onClickHandler}
      ref={innerRef}
      {...props}
    />
  );
});
