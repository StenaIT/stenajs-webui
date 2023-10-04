import { SidebarMenuLink } from "../../items/SidebarMenuLink";
import * as React from "react";
import { ReactNode } from "react";
import { SidebarMenuHeading } from "../../items/SidebarMenuHeading";
import { SidebarMenuSeparator } from "../../items/SidebarMenuSeparator";
import { SidebarMenuCollapsible } from "../../items/SidebarMenuCollapsible";
import { Box, exhaustSwitchCaseElseThrow } from "@stenajs-webui/core";
import { Popover } from "@stenajs-webui/tooltip";
import { SidebarItem } from "./types";

export const renderItemsExpanded = (items: SidebarItem[]): ReactNode[] => {
  return items.map((item, index) => {
    switch (item.type) {
      case "heading":
        return <SidebarMenuHeading key={index} label={item.label} />;
      case "separator":
        return <SidebarMenuSeparator key={index} />;
      case "link": {
        const { type, ...linkProps } = item;
        return <SidebarMenuLink key={index} {...linkProps} />;
      }
      case "grouped":
        return (
          <SidebarMenuCollapsible
            key={index}
            leftIcon={item.leftIcon}
            label={item.label}
            initialExpand={true}
          >
            {renderItemsExpanded(item.items)}
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
  return items.map((item, index) => {
    switch (item.type) {
      case "heading":
        return null;
      case "separator":
        return <SidebarMenuSeparator key={index} />;
      case "link": {
        const { type, label, ...linkProps } = item;
        return (
          <SidebarMenuLink
            key={index}
            title={label}
            label={label}
            {...linkProps}
          />
        );
      }
      case "grouped":
        return (
          <div key={index}>
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
                label={item.label}
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
