import * as React from "react";
import { Box, Column, SeparatorLine, Space } from "@stenajs-webui/core";
import styles from "./SidebarMenu.module.css";

export interface SidebarMenuProps {}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ children }) => {
  return (
    <Box className={styles.sidebarMenu}>
      <Column flexGrow={1}>
        {children}
        <Space num={2} />
        <SeparatorLine color={"var(--swui-sidebarmenu-separator-color)"} />
        <Space num={2} />
      </Column>
    </Box>
  );
};
