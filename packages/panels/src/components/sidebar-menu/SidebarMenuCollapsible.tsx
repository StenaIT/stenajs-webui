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
  const wrappedIcon = iconLeft ? (
    <Box width={56} alignItems={"center"} justifyContent={"center"}>
      <div className={styles.contentLeft}>
        <Icon icon={iconLeft} size={24} data-hover={true} />
      </div>
    </Box>
  ) : (
    <Indent num={1} />
  );
  const parentHasIconClass: string = styles.parentHasIcon;
  return (
    <Collapsible
      label={label}
      className={cx(styles.collapsibleTitle, {
        [parentHasIconClass]: iconLeft,
      })}
      collapsed={collapsed}
      onClick={() => setCollapsed(!collapsed)}
      contentLeft={wrappedIcon}
    >
      {children}
    </Collapsible>
  );
};
