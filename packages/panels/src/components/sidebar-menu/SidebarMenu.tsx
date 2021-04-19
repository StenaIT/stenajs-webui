import * as React from "react";
import {
  Box,
  BoxProps,
  Column,
  SeparatorLine,
  Space,
} from "@stenajs-webui/core";
import styles from "./SidebarMenu.module.css";
import cx from "classnames";
import {
  SidebarMenuCloseButton,
  SidebarMenuCloseButtonProps,
} from "./SidebarMenuCloseButton";

export interface SidebarMenuProps extends BoxProps {
  onCloseClick?: SidebarMenuCloseButtonProps["onClick"];
}

// TODO Add variant

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  className,
  children,
  onCloseClick,
  ...boxProps
}) => {
  return (
    <Box className={cx(styles.sidebarMenu, className)} {...boxProps}>
      <Box alignItems={"flex-start"} justifyContent={"center"}>
        <SidebarMenuCloseButton onClick={onCloseClick} variant={"dark"} />
      </Box>
      <SeparatorLine color={"var(--lhds-color-blue-700)"} />
      <Space />
      <Box
        className={styles.sidebarMenuContent}
        background={"var(--swui-sidebar-menu-background-color)"}
      >
        <Column flexGrow={1}>{children}</Column>
      </Box>
    </Box>
  );
};
