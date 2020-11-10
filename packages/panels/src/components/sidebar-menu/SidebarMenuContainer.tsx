import { Box, SeparatorLine, Space } from "@stenajs-webui/core";
import { FlatButton } from "@stenajs-webui/elements";
import * as React from "react";
import styles from "./SidebarMenu.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface SidebarMenuContainerProps {
  onCloseClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SidebarMenuContainer: React.FC<SidebarMenuContainerProps> = ({
  onCloseClick,
  children,
}) => {
  return (
    <Box className={styles.sidebarContainer}>
      <Box indent={1} spacing={1} alignItems={"flex-start"}>
        <FlatButton onClick={onCloseClick} leftIcon={faTimes} size={"large"} />
      </Box>
      <SeparatorLine color={"var(--swui-sidebarmenu-separator-color)"} />
      <Space num={2} />
      {children}
    </Box>
  );
};
