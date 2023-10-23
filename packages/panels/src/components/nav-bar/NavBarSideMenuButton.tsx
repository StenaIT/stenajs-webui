import * as React from "react";
import cx from "classnames";
import styles from "./NavBarSideMenuButton.module.css";
import { DivProps } from "@stenajs-webui/core";
import Hamburger from "./svg/bars.svg?react";

export interface SidebarMenuButtonProps extends Pick<DivProps, "className"> {
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NavBarSideMenuButton: React.FC<SidebarMenuButtonProps> = ({
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cx(styles.sidebarMenuButton, className)}
    >
      <Hamburger className={styles.icon} />
    </button>
  );
};
