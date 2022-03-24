import * as React from "react";
import cx from "classnames";
import styles from "./SidebarMenuCloseButton.module.css";
import { Box, ButtonElementProps } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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
        <Icon icon={faTimes} className={styles.icon} />
      </Box>
    </button>
  );
};
