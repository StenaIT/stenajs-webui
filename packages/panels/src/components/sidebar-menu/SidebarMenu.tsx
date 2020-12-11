import * as React from "react";
import {
  Box,
  BoxProps,
  Column,
  SeparatorLine,
  Space,
  Spacing,
} from "@stenajs-webui/core";
import styles from "./SidebarMenu.module.css";
import { SidebarMenuSeparator } from "./SidebarMenuSeparator";
import cx from "classnames";
import { HamburgerMenuButton } from "../nav-bar/HamburgerMenuButton";

export interface SidebarMenuProps extends BoxProps {
  variant?: SidebarMenuVariant;
  onCloseClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export type SidebarMenuVariant = "standard" | "dark";

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  className,
  variant = "standard",
  children,
  onCloseClick,
  ...boxProps
}) => {
  return (
    <Box
      className={cx(styles.sidebarMenu, styles[variant], className)}
      {...boxProps}
    >
      <Box alignItems={"flex-start"} size={64} justifyContent={"center"}>
        <HamburgerMenuButton
          onClick={onCloseClick}
          variant={"dark"}
          className={"hamburgerClose"}
          isOpen={true}
        />
      </Box>
      <SeparatorLine color={"var(--lhds-color-blue-700)"} />
      <Space />
      <Box
        className={styles.sidebarMenuContent}
        background={"var(--swui-sidebar-menu-background-color)"}
      >
        <Column flexGrow={1}>
          {children}
          <Spacing num={2}>
            <SidebarMenuSeparator />
          </Spacing>
        </Column>
      </Box>
    </Box>
  );
};
