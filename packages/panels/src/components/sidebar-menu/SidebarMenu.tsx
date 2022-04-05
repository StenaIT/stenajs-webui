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
  collapsed?: boolean;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  className,
  children,
  onCloseClick,
  collapsed = false,
  hideCloseButton = false,
  ...boxProps
}) => {
  return (
    <Box
      className={cx(
        styles.sidebarMenu,
        collapsed ? styles.collapsed : null,
        className
      )}
      data-collapsed={collapsed || undefined}
      {...boxProps}
    >
      {!hideCloseButton && (
        <>
          <SidebarMenuCloseButton onClick={onCloseClick} />
          <SeparatorLine color={cssColor("--lhds-color-blue-700")} />
          <Space />
        </>
      )}
      <Box
        className={styles.sidebarMenuContent}
        height={"100%"}
        background={"var(--current-background-color)"}
      >
        <Column flex={1}>{children}</Column>
      </Box>
    </Box>
  );
};
