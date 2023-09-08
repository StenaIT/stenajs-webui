import * as React from "react";
import { ReactNode, useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { MenuButton } from "@stenajs-webui/elements";

export interface SidebarMenuCollapsibleProps {
  label: string;
  collapsed?: boolean;
  leftIcon?: IconDefinition;
  children?: ReactNode;
  className?: string;
  initialExpand?: boolean;
}

export const SidebarMenuCollapsible: React.FC<SidebarMenuCollapsibleProps> = ({
  children,
  label,
  leftIcon,
  className,
  initialExpand = false,
}) => {
  const [expanded, setExpanded] = useState<boolean>(initialExpand);

  return (
    <MenuButton
      label={label}
      onClick={() => setExpanded(!expanded)}
      leftIcon={leftIcon}
      className={className}
      expandable
      expanded={expanded}
      selected={expanded}
    >
      {children}
    </MenuButton>
  );
};
