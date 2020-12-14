import * as React from "react";
import cx from "classnames";
import styles from "./NavBarSideMenuButton.module.css";
import { DivProps } from "@stenajs-webui/core";
import { NavBarVariant } from "./NavBar";
import { ReactComponent as HamburgerBarsSvg } from "./svg/bars.svg";

export interface SidebarMenuButtonProps extends Pick<DivProps, "className"> {
  variant?: NavBarVariant;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NavBarSideMenuButton: React.FC<SidebarMenuButtonProps> = ({
  variant = "standard",
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cx(styles.sidebarMenuButton, styles[variant], className)}
    >
      <HamburgerBarsSvg className={styles.icon} />
    </button>
  );
};
