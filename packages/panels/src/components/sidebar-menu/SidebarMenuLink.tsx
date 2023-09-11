import * as React from "react";
import { MenuButton, MenuButtonProps } from "@stenajs-webui/elements";

export interface SidebarMenuLinkProps
  extends Omit<MenuButtonProps, "expanded" | "expandable"> {}

export const SidebarMenuLink: React.FC<SidebarMenuLinkProps> = (props) => {
  return <MenuButton {...props} expandable={false} />;
};
