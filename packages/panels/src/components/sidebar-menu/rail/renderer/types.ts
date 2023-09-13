import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { SidebarMenuLinkProps } from "../../SidebarMenuLink";

export interface SidebarHeadingItem {
  type: "heading";
  label: string;
}

export interface SidebarSeparatorItem {
  type: "separator";
}

export type SidebarLinkItem = SidebarMenuLinkProps & {
  type: "link";
};

export interface SidebarGroupedItem {
  type: "grouped";
  label: string;
  leftIcon?: IconDefinition;
  items: SidebarItem[];
}

export type SidebarItem =
  | SidebarHeadingItem
  | SidebarSeparatorItem
  | SidebarLinkItem
  | SidebarGroupedItem;
