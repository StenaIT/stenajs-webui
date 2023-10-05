import * as React from "react";
import { ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Popover } from "@stenajs-webui/tooltip";
import { Box } from "@stenajs-webui/core";
import { SidebarMenuHeading } from "./SidebarMenuHeading";
import { MenuButton } from "@stenajs-webui/elements";
import { RailContext } from "../rail/RailContext";

export interface RailMenuCollapsibleProps {
  label: string;
  collapsed?: boolean;
  leftIcon?: IconDefinition;
  children?: ReactNode;
  popupMinWidth?: string;
}

export const RailMenuCollapsible: React.FC<RailMenuCollapsibleProps> = ({
  children,
  label,
  leftIcon,
  popupMinWidth = "200px",
}) => {
  return (
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
          shadow={"popover"}
          spacing={1}
          indent={1}
          gap={2}
        >
          <RailContext.Provider value={false}>
            <SidebarMenuHeading label={label} />
            {children}
          </RailContext.Provider>
        </Box>
      }
    >
      <MenuButton leftIcon={leftIcon} />
    </Popover>
  );
};
