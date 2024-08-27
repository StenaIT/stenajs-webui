import * as React from "react";
import {
  MenuButtonLink,
  MenuButtonLinkNotSelectedProps,
  MenuButtonLinkWithRenderLinkProps,
  MenuButtonLinkWithSelectedProps,
} from "@stenajs-webui/elements";
import { useRailContext } from "../rail/RailContext";
import { RailMenuLink } from "./RailMenuLink";

export type SidebarMenuLinkProps = (
  | MenuButtonLinkNotSelectedProps
  | MenuButtonLinkWithSelectedProps
  | MenuButtonLinkWithRenderLinkProps
) & { label: string };

export const SidebarMenuLink: React.FC<SidebarMenuLinkProps> = (props) => {
  const isRail = useRailContext();

  if (isRail) {
    return <RailMenuLink {...props} />;
  }

  return <MenuButtonLink {...props} />;
};
