import { Box, BoxProps, Column, Space } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { ReactNode } from "react";
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
  bottomItems?: ReactNode;
  onClickPinButton?: () => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  className,
  children,
  onCloseClick,
  variant = "standard",
  pinButtonVisible,
  onClickPinButton,
  bottomItems,
  isPinned,
  ...boxProps
}) => {
  return (
    <Box {...boxProps} className={cx(styles.sidebarMenu, className)}>
      <SidebarMenuCloseButtonRow onClick={onCloseClick} />
      <Box className={styles.scrollContainer}>
        <Column
          className={styles.sidebarItems}
          justifyContent={"space-between"}
          flex={1}
          gap={1}
          indent={1}
        >
          <Column gap={1}>{children}</Column>
          {(bottomItems || pinButtonVisible) && (
            <Column gap={1}>
              {bottomItems}
              {pinButtonVisible && (
                <SidebarMenuPinButton
                  isPinned={isPinned}
                  onClick={onClickPinButton}
                />
              )}
              <Space />
            </Column>
          )}
        </Column>
      </Box>
    </Box>
  );
};
