import * as React from "react";
import { SidebarMenu, SidebarMenuVariant } from "../SidebarMenu";
import { NavBarSideMenuButton } from "../../nav-bar/NavBarSideMenuButton";

interface RailMenuProps {
  variant?: SidebarMenuVariant;
  onClickMenuButton?: () => void;
}

export const SidebarRailMenu: React.FC<RailMenuProps> = ({
  variant,
  onClickMenuButton,
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
      <NavBarSideMenuButton onClick={onClickMenuButton} />
      {children}
    </SidebarMenu>
  );
};
