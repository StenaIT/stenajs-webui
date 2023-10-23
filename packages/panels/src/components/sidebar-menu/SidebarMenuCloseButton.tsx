import * as React from "react";
import cx from "classnames";
import styles from "./SidebarMenuCloseButton.module.css";
import { Box, ButtonElementProps } from "@stenajs-webui/core";
import CloseIcon from "./svg/close.svg?react";

export interface SidebarMenuCloseButtonProps extends ButtonElementProps {}

export const SidebarMenuCloseButton: React.FC<SidebarMenuCloseButtonProps> = ({
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cx(styles.sidebarMenuCloseButton, className)}
    >
      <Box className={styles.iconWrapper}>
        <CloseIcon className={styles.icon} />
      </Box>
    </button>
  );
};
