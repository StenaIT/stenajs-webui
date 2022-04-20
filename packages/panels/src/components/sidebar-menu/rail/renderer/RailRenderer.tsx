import { SidebarMenuLink } from "../../SidebarMenuLink";
import * as React from "react";
import { ReactNode } from "react";
import { SidebarMenuHeading } from "../../SidebarMenuHeading";
import { SidebarMenuSeparator } from "../../SidebarMenuSeparator";
import { SidebarMenuCollapsible } from "../../SidebarMenuCollapsible";
import { Box, exhaustSwitchCaseElseThrow } from "@stenajs-webui/core";
import { Popover } from "@stenajs-webui/tooltip";
import { SidebarItem } from "./types";

export const renderItemsExpanded = (
  items: SidebarItem[],
  indent = false
): ReactNode[] => {
  return items.map((item) => {
    switch (item.type) {
      case "heading":
        return <SidebarMenuHeading label={item.label} />;
      case "separator":
        return <SidebarMenuSeparator />;
      case "link": {
        const { type, ...linkProps } = item;
        return <SidebarMenuLink indent={indent} {...linkProps} />;
      }
      case "grouped":
        return (
          <SidebarMenuCollapsible leftIcon={item.leftIcon} label={item.label}>
            {renderItemsExpanded(item.items, true)}
          </SidebarMenuCollapsible>
        );
      default:
        return exhaustSwitchCaseElseThrow(item);
    }
  });
};

interface RailRendererOptions {
  popupMinWidth: string | number;
}

export const renderItemsInRail = (
  items: SidebarItem[],
  { popupMinWidth }: RailRendererOptions
): ReactNode[] => {
  return items.map((item) => {
    switch (item.type) {
      case "heading":
        return null;
      case "separator":
        return <SidebarMenuSeparator />;
      case "link": {
        const { type, label, ...linkProps } = item;
        return (
          <SidebarMenuLink
            title={label}
            width={"var(--swui-sidebar-menu-item-height)"}
            {...linkProps}
          />
        );
      }
      case "grouped":
        return (
          <div>
            <Popover
              appendTo={"parent"}
              arrow={false}
              offset={[0, 0]}
              placement={"right-start"}
              trigger={"focusin mouseenter click"}
              disablePadding
              lazy
              content={
                <Box
                  minWidth={popupMinWidth}
                  background={"var(--lhds-color-blue-500)"}
                >
                  <SidebarMenuHeading label={item.label} />
                  {renderItemsExpanded(item.items)}
                </Box>
              }
            >
              <SidebarMenuLink
                title={item.label}
                width={"var(--swui-sidebar-menu-item-height)"}
                leftIcon={item.leftIcon}
              />
            </Popover>
          </div>
        );
      default:
        return exhaustSwitchCaseElseThrow(item);
    }
  });
};
