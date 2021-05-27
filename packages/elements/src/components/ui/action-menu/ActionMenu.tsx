import { BoxProps, Column } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import styles from "./ActionMenu.module.css";
import { FocusScope } from "@react-aria/focus";
import cx from "classnames";

export type ActionMenuVariant = "standard" | "outlined";

export interface ActionMenuProps {
  top?: ReactNode;
  width?: BoxProps["width"];
  variant?: ActionMenuVariant;
  shadow?: BoxProps["shadow"];
  trapFocus?: boolean;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  top,
  children,
  width,
  shadow,
  variant = "standard",
  trapFocus,
}) => {
  if (!children) {
    return null;
  }

  return (
    <FocusScope contain={trapFocus}>
      <Column
        className={cx(styles.actionMenu, styles[variant])}
        width={width}
        shadow={shadow}
      >
        {top}
        <Column>{children}</Column>
      </Column>
    </FocusScope>
  );
};
