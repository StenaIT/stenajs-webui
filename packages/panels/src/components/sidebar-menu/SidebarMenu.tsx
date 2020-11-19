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
import { FlatButton } from "@stenajs-webui/elements";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { SidebarMenuSeparator } from "./SidebarMenuSeparator";

export interface SidebarMenuProps extends BoxProps {
  onCloseClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  children,
  onCloseClick,
  ...boxProps
}) => {
  return (
    <Box
      className={styles.sidebarMenu}
      background={"var(--lhds-color-blue-900)"}
      {...boxProps}
    >
      <Box indent={1} spacing={1} alignItems={"flex-start"}>
        <FlatButton onClick={onCloseClick} leftIcon={faTimes} size={"large"} />
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
