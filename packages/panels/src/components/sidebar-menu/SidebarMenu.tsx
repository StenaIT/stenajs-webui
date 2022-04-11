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
import { getNavbarHeight } from "../nav-bar/NavbarHeightStyleUtil";
import { NavBarVariant } from "../nav-bar/NavBar";

export type SidebarMenuVariant = NavBarVariant;

export interface SidebarMenuProps extends BoxProps {
  onCloseClick?: SidebarMenuCloseButtonProps["onClick"];
  hideCloseButton?: boolean;
  collapsed?: boolean;
  variant?: SidebarMenuVariant;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  className,
  children,
  onCloseClick,
  collapsed = false,
  hideCloseButton = false,
  variant = "standard",
  ...boxProps
}) => {
  console.log(variant);
  const height = getNavbarHeight(variant);

  return (
    <Box
      className={cx(
        styles.sidebarMenu,
        collapsed ? styles.collapsed : null,
        className
      )}
      style={{
        ["--swui-sidebar-menu-item-height" as string]: height,
        ["--swui-nav-bar-height" as string]: height,
      }}
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
