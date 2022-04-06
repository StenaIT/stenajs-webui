import * as React from "react";
import { SidebarMenu, SidebarMenuVariant } from "../SidebarMenu";

interface RailMenuProps {
  variant?: SidebarMenuVariant;
}

export const SidebarRailMenu: React.FC<RailMenuProps> = ({
  variant,
  children,
}) => {
  return (
    <SidebarMenu
      collapsed
      position={"fixed"}
      left={0}
      top={0}
      hideCloseButton
      variant={variant}
    >
      {children}
    </SidebarMenu>
  );
};
