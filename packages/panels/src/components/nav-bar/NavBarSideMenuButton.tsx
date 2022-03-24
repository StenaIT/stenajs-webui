import * as React from "react";
import cx from "classnames";
import styles from "./NavBarSideMenuButton.module.css";
import { DivProps } from "@stenajs-webui/core";
import { NavBarVariant } from "./NavBar";
import { Icon } from "@stenajs-webui/elements";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

export interface SidebarMenuButtonProps extends Pick<DivProps, "className"> {
  variant?: NavBarVariant;
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
      <Icon className={styles.icon} icon={faBars} size={16} fixedWidth />
    </button>
  );
};
