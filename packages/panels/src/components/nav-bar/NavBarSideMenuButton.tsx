import * as React from "react";
import { DivProps } from "@stenajs-webui/core";
import { FlatButton, stenaHamburger } from "@stenajs-webui/elements";

export interface SidebarMenuButtonProps extends Pick<DivProps, "className"> {
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NavBarSideMenuButton: React.FC<SidebarMenuButtonProps> = ({
  className,
  onClick,
}) => {
  return (
    <FlatButton
      leftIcon={stenaHamburger}
      className={className}
      onClick={onClick}
    />
  );
};
