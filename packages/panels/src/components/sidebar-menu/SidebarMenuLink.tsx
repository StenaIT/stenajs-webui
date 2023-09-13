import * as React from "react";
import {
  MenuButtonLink,
  MenuButtonLinkNotSelectedProps,
  MenuButtonLinkWithRenderLinkProps,
  MenuButtonLinkWithSelectedProps,
} from "@stenajs-webui/elements";

export type SidebarMenuLinkProps =
  | MenuButtonLinkNotSelectedProps
  | MenuButtonLinkWithSelectedProps
  | MenuButtonLinkWithRenderLinkProps;

export const SidebarMenuLink: React.FC<SidebarMenuLinkProps> = (props) => {
  return <MenuButtonLink {...props} />;
};
