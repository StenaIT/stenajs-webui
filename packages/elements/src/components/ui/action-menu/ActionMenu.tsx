import { BoxProps, Column } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import styles from "./ActionMenu.module.css";

export interface ActionMenuProps {
  top?: ReactNode;
  width?: string;
  shadow?: BoxProps["shadow"];
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  top,
  children,
  width = "200px",
  shadow,
}) => {
  if (!children) {
    return null;
  }

  return (
    <Column className={styles.ActionMenu} width={width} shadow={shadow}>
      {top}
      <Column>{children}</Column>
    </Column>
  );
};
