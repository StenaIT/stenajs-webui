import * as React from "react";
import { ReactNode, useState } from "react";
import { Collapsible } from "../collapsible/Collapsible";
import { Box, Column, Indent } from "@stenajs-webui/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./SidebarMenuCollapsible.module.css";
import { Icon } from "@stenajs-webui/elements";

export interface SidebarMenuCollapsibleProps {
  label: string;
  collapsed?: boolean;
  leftIcon?: IconDefinition;
  children?: ReactNode;
}

export const SidebarMenuCollapsible: React.FC<SidebarMenuCollapsibleProps> = ({
  children,
  label,
  leftIcon,
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Box background={"var(--current-background-color)"}>
      <Collapsible
        className={styles.sidebarMenuCollapsible}
        label={label}
        collapsed={collapsed}
        onClick={() => setCollapsed(!collapsed)}
        contentLeft={
          leftIcon ? (
            <Box
              width={"var(--swui-sidebar-menu-item-height)"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Icon
                icon={leftIcon}
                size={16}
                color={"var(--current-text-color)"}
                data-hover={true}
              />
            </Box>
          ) : (
            <Indent num={1} />
          )
        }
      >
        <Column flex={1}>{children}</Column>
      </Collapsible>
    </Box>
  );
};
