import { Box, SeparatorLine, Space } from "@stenajs-webui/core";
import { Icon, Link } from "@stenajs-webui/elements";
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
      <Box indent={2} spacing={2} alignItems={"flex-start"}>
        <Link onClick={onCloseClick}>
          <Icon
            icon={faTimes}
            color={"var(--swui-sidebarmenu-text-color)"}
            size={15}
            data-hover={true}
          />
        </Link>
      </Box>
      <SeparatorLine color={"var(--swui-sidebarmenu-separator-color)"} />
      <Space num={2} />
      {children}
    </Box>
  );
};
