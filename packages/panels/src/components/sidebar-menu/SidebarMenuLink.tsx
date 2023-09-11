import * as React from "react";
import {
  MenuButtonLink,
  MenuButtonLinkNoRenderLinkProps,
  MenuButtonLinkWithRenderLinkProps,
} from "@stenajs-webui/elements";

export type SidebarMenuLinkProps =
  | MenuButtonLinkNoRenderLinkProps
  | MenuButtonLinkWithRenderLinkProps;

export const SidebarMenuLink: React.FC<SidebarMenuLinkProps> = (props) => {
  return <MenuButtonLink {...props} />;
};
