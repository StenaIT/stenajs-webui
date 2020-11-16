import * as React from "react";
import { Box, Column, SeparatorLine, Space } from "@stenajs-webui/core";
import styles from "./SidebarMenu.module.css";
import { FlatButton } from "@stenajs-webui/elements";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export interface SidebarMenuProps {
  onCloseClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  children,
  onCloseClick,
}) => {
  return (
    <Box className={styles.sidebarMenu}>
      <Box indent={1} spacing={1} alignItems={"flex-start"}>
        <FlatButton onClick={onCloseClick} leftIcon={faTimes} size={"large"} />
      </Box>
      <SeparatorLine color={"var(--swui-sidebar-menu-separator-color)"} />
      <Space />
      <Box className={styles.sidebarMenuContent}>
        <Column flexGrow={1}>
          {children}
          <Space num={2} />
          <SeparatorLine color={"var(--swui-sidebar-menu-separator-color)"} />
          <Space num={2} />
        </Column>
      </Box>
    </Box>
  );
};
