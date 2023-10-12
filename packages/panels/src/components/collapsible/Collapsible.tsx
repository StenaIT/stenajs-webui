import { ButtonElementProps, DivProps } from "@stenajs-webui/core";
import { MenuButton } from "@stenajs-webui/elements";
import * as React from "react";
import { forwardRef } from "react";
import { CollapsibleEmptyContent } from "./CollapsibleEmptyContent";

export interface CollapsibleProps extends Omit<DivProps, "onClick"> {
  label: string;
  onClick?: ButtonElementProps["onClick"];
  contentLeft?: React.ReactNode;
  contentRight?: React.ReactNode;
  collapsed?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}

export const Collapsible = forwardRef<HTMLButtonElement, CollapsibleProps>(
  function Collapsible(
    {
      label,
      contentLeft,
      contentRight,
      collapsed = false,
      onClick,
      disabled = false,
      children,
      autoFocus = false,
    },
    ref
  ) {
    return (
      <MenuButton
        autoFocus={autoFocus}
        ref={ref}
        label={label}
        onClick={onClick}
        disabled={disabled}
        expandable
        expanded={!collapsed}
        selected={!collapsed}
        left={contentLeft}
        right={contentRight}
      >
        {children ?? <CollapsibleEmptyContent />}
      </MenuButton>
    );
  }
);
