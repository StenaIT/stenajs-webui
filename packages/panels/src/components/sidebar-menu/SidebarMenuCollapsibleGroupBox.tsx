import * as React from "react";
import styles from "./SidebarMenuCollapsibleGroupBox.module.css";
import { ReactNode } from "react";

export interface SidebarMenuCollapsibleGroupLineProps {
  children?: ReactNode;
  indent?: number | boolean;
}

export const SidebarMenuCollapsibleGroupBox: React.FC<
  SidebarMenuCollapsibleGroupLineProps
> = ({ children }) => {
  return (
    <div className={styles.sidebarMenuCollapsibleGroupBox}>{children}</div>
  );
};
