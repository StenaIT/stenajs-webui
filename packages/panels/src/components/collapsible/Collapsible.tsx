import { ButtonElementProps } from "@stenajs-webui/core";
import { MenuButton } from "@stenajs-webui/elements";
import * as React from "react";
import { forwardRef } from "react";
import { CollapsibleEmptyContent } from "./CollapsibleEmptyContent";

export interface CollapsibleProps extends Omit<ButtonElementProps, "value"> {
  label: string;
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
      ...props
    },
    ref
  ) {
    return (
      <MenuButton
        {...props}
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
