import { FocusScope } from "@react-aria/focus";
import { BoxProps, Column } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";

export interface ActionMenuProps {
  top?: ReactNode;
  width?: BoxProps["width"];
  shadow?: BoxProps["shadow"];
  trapFocus?: boolean;
  children?: ReactNode;
  className?: string;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  top,
  children,
  width,
  shadow,
  trapFocus,
  className,
}) => {
  if (!children) {
    return null;
  }

  return (
    <FocusScope contain={trapFocus}>
      <Column
        width={width}
        shadow={shadow}
        indent={1}
        spacing={1}
        className={className}
        borderRadius={"8px"}
      >
        {top}
        <Column>{children}</Column>
      </Column>
    </FocusScope>
  );
};
