import * as React from "react";
import { ReactNode, useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { CollapsibleButton } from "../collapsible/prutt/CollapsibleButton";

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
    <CollapsibleButton
      label={label}
      onClick={() => setExpanded(!expanded)}
      leftIcon={leftIcon}
      className={className}
      expandable
      expanded={expanded}
      selected={expanded}
    >
      {children}
    </CollapsibleButton>
  );
};
