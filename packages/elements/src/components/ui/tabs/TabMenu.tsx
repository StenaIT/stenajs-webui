import * as React from "react";
import { ReactNode } from "react";
import styles from "./TabMenu.module.css";
import cx from "classnames";

export interface TabMenuProps {
  enableBorder?: boolean;
  children?: ReactNode;
}

export const TabMenu: React.FC<TabMenuProps> = ({ children, enableBorder }) => {
  return (
    <div
      className={cx(styles.tabMenu, { [styles.withBorder]: enableBorder })}
      role={"tablist"}
    >
      {children}
    </div>
  );
};
