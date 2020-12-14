import * as React from "react";
import cx from "classnames";
import styles from "./SidebarMenuCloseButton.module.css";
import { ButtonElementProps } from "@stenajs-webui/core";
import { ReactComponent as HamburgerCloseSvg } from "./svg/close.svg";

export interface SidebarMenuCloseButtonProps extends ButtonElementProps {
  variant?: SidebarMenuCloseButtonVariant;
}

export type SidebarMenuCloseButtonVariant = "standard" | "dark";

export const SidebarMenuCloseButton: React.FC<SidebarMenuCloseButtonProps> = ({
  className,
  onClick,
  variant = "standard",
}) => {
  return (
    <button
      onClick={onClick}
      className={cx(styles.sidebarMenuCloseButton, className, styles[variant])}
    >
      <HamburgerCloseSvg className={styles.icon} />
    </button>
  );
};
