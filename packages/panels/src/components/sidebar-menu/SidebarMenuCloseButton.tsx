import * as React from "react";
import cx from "classnames";
import styles from "./SidebarMenuCloseButton.module.css";
import { Box, ButtonElementProps } from "@stenajs-webui/core";
import { ReactComponent as CloseIcon } from "./svg/close.svg";

export interface SidebarMenuCloseButtonProps extends ButtonElementProps {
  variant?: SidebarMenuCloseButtonVariant;
}

export type SidebarMenuCloseButtonVariant = "light" | "dark";

export const SidebarMenuCloseButton: React.FC<SidebarMenuCloseButtonProps> = ({
  className,
  onClick,
  variant = "light",
}) => {
  return (
    <button
      onClick={onClick}
      className={cx(styles.sidebarMenuCloseButton, className, styles[variant])}
    >
      <Box className={styles.iconWrapper}>
        <CloseIcon className={styles.icon} />
      </Box>
    </button>
  );
};
