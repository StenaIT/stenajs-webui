import { FocusScope } from "@react-aria/focus";
import { BoxProps, Column } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { ReactNode } from "react";
import styles from "./ActionMenu.module.css";

export type ActionMenuVariant = "standard" | "outlined";

export interface ActionMenuProps {
  top?: ReactNode;
  width?: BoxProps["width"];
  variant?: ActionMenuVariant;
  shadow?: BoxProps["shadow"];
  trapFocus?: boolean;
  children?: ReactNode;
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
