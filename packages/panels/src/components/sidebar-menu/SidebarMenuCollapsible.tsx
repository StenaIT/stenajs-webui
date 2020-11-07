import * as React from "react";
import { useState } from "react";
import { Collapsible } from "../collapsible/Collapsible";
import { Box } from "@stenajs-webui/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./SidebarMenu.module.css";
import { Icon } from "@stenajs-webui/elements";

export interface SidebarMenuCollapsibleProps {
  label: string;
  collapsed?: boolean;
  iconLeft?: IconDefinition;
}

export const SidebarMenuCollapsible: React.FC<SidebarMenuCollapsibleProps> = ({
  children,
  label,
  iconLeft,
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const wrappedIcon = (
    <Box width={56} alignItems={"center"} justifyContent={"center"}>
      <div className={styles.contentLeft}>
        {<Icon icon={iconLeft} size={24} data-hover={true} />}
      </div>
    </Box>
  );
  return (
    <Collapsible
      label={label}
      className={styles.collapsibleTitle}
      collapsed={collapsed}
      onClick={() => setCollapsed(!collapsed)}
      style={{}}
      contentLeft={wrappedIcon}
    >
      {children}
    </Collapsible>
  );
};
