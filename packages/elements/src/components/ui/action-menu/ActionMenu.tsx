import { BoxProps, Column } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import styles from "./ActionMenu.module.css";
import { FocusScope } from "@react-aria/focus";

export interface ActionMenuProps {
  top?: ReactNode;
  width?: string;
  shadow?: BoxProps["shadow"];
  trapFocus?: boolean;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  top,
  children,
  width = "200px",
  shadow,
  trapFocus,
}) => {
  if (!children) {
    return null;
  }

  return (
    <FocusScope contain={trapFocus}>
      <Column className={styles.ActionMenu} width={width} shadow={shadow}>
        {top}
        <Column>{children}</Column>
      </Column>
    </FocusScope>
  );
};
