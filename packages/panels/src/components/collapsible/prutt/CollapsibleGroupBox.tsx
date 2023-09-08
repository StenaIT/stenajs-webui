import * as React from "react";
import styles from "./CollapsibleGroupBox.module.css";
import { ReactNode } from "react";

export interface CollapsibleGroupBoxProps {
  children?: ReactNode;
}

export const CollapsibleGroupBox: React.FC<CollapsibleGroupBoxProps> = ({
  children,
}) => {
  return <div className={styles.collapsibleGroupBox}>{children}</div>;
};
