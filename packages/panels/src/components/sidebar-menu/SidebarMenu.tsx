import { Box, BoxProps, Column, Space } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import styles from "./SidebarMenu.module.css";
import {
  SidebarMenuCloseButtonRow,
  SidebarMenuCloseButtonRowProps,
} from "./SidebarMenuCloseButtonRow";
import { NavBarVariant } from "../nav-bar/NavBar";
import { SidebarMenuPinButton } from "./SidebarMenuPinButton";

export type SidebarMenuVariant = NavBarVariant;

export interface SidebarMenuProps extends BoxProps {
  onCloseClick?: SidebarMenuCloseButtonRowProps["onClick"];
  variant?: SidebarMenuVariant;
  pinButtonVisible?: boolean;
  isPinned?: boolean;
  onClickPinButton?: () => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  className,
  children,
  onCloseClick,
  variant = "standard",
  pinButtonVisible,
  onClickPinButton,
  isPinned,
  ...boxProps
}) => {
  return (
    <Box
      indent={1}
      className={cx(styles.sidebarMenu, className)}
      style={{
        ["--swui-sidebar-menu-item-height" as string]: "40px",
      }}
      {...boxProps}
    >
      <SidebarMenuCloseButtonRow onClick={onCloseClick} />
      <Box
        height={"100%"}
        background={"var(--current-background-color)"}
        overflow={"auto"}
      >
        <Column justifyContent={"space-between"} flex={1} gap={1}>
          <Column gap={1}>{children}</Column>
          {pinButtonVisible && (
            <Column>
              <SidebarMenuPinButton
                isPinned={isPinned}
                onClick={onClickPinButton}
              />
              <Space />
            </Column>
          )}
        </Column>
      </Box>
    </Box>
  );
};
