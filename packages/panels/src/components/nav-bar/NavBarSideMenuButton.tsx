import * as React from "react";
import cx from "classnames";
import styles from "./NavBarSideMenuButton.module.css";
import { DivProps } from "@stenajs-webui/core";
import { ReactComponent as Hamburger } from "./svg/bars.svg";
import { SidebarMenuVariant } from "../sidebar-menu/SidebarMenu";

export interface SidebarMenuButtonProps extends Pick<DivProps, "className"> {
  variant?: SidebarMenuVariant;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NavBarSideMenuButton: React.FC<SidebarMenuButtonProps> = ({
  variant = "light",
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cx(styles.sidebarMenuButton, styles[variant], className)}
    >
      <Hamburger className={styles.icon} />
    </button>
  );
};
