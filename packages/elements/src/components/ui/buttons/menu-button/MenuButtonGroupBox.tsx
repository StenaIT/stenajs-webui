import * as React from "react";
import { ReactNode } from "react";
import styles from "./MenuButtonGroupBox.module.css";

export interface MenuButtonGroupBoxProps {
  children?: ReactNode;
}

export const MenuButtonGroupBox: React.FC<MenuButtonGroupBoxProps> = ({
  children,
}) => {
  return <div className={styles.menuButtonGroupBox}>{children}</div>;
};
