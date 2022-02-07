import {
  Box,
  BoxProps,
  Column,
  SeparatorLine,
  Space,
} from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import cx from "classnames";
import * as React from "react";
import styles from "./SidebarMenu.module.css";
import {
  SidebarMenuCloseButton,
  SidebarMenuCloseButtonProps,
} from "./SidebarMenuCloseButton";

export interface SidebarMenuProps extends BoxProps {
  onCloseClick?: SidebarMenuCloseButtonProps["onClick"];
  hideCloseButton?: boolean;
}

// TODO Add variant

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  className,
  children,
  onCloseClick,
  hideCloseButton = false,
  ...boxProps
}) => {
  return (
    <Box className={cx(styles.sidebarMenu, className)} {...boxProps}>
      {!hideCloseButton && (
        <>
          <Box alignItems={"flex-start"} justifyContent={"center"}>
            <SidebarMenuCloseButton onClick={onCloseClick} variant={"dark"} />
          </Box>
          <SeparatorLine color={cssColor("--lhds-color-blue-700")} />
          <Space />
        </>
      )}
      <Box
        className={styles.sidebarMenuContent}
        background={"var(--swui-sidebar-menu-background-color)"}
      >
        <Column flexGrow={1}>{children}</Column>
      </Box>
    </Box>
  );
};
