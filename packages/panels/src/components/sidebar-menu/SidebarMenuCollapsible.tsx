import * as React from "react";
import { useState } from "react";
import { Collapsible } from "../collapsible/Collapsible";
import { Box, Indent } from "@stenajs-webui/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./SidebarMenu.module.css";
import cx from "classnames";
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

  return (
    <Collapsible
      label={label}
      className={cx(styles.collapsibleTitle, {
        [styles.parentHasIcon]: iconLeft,
      })}
      collapsed={collapsed}
      onClick={() => setCollapsed(!collapsed)}
      contentLeft={
        iconLeft ? (
          <Box width={"56px"} alignItems={"center"} justifyContent={"center"}>
            <Icon
              icon={iconLeft}
              size={18}
              color={"--swui-sidebar-menu-text-color"}
              data-hover={true}
            />
          </Box>
        ) : (
          <Indent num={1} />
        )
      }
    >
      {children}
    </Collapsible>
  );
};
