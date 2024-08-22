import * as React from "react";
import { ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Popover } from "@stenajs-webui/tooltip";
import { Box } from "@stenajs-webui/core";
import { SidebarMenuHeading } from "./SidebarMenuHeading";
import { RailContext } from "../rail/RailContext";
import { IconMenuButton } from "@stenajs-webui/elements";

export interface RailMenuCollapsibleProps {
  label: string;
  collapsed?: boolean;
  icon: IconDefinition;
  children?: ReactNode;
  popupMinWidth?: string;
}

// TODO POPOVER placement={"right-start"}
export const RailMenuCollapsible: React.FC<RailMenuCollapsibleProps> = ({
  children,
  label,
  icon,
  popupMinWidth = "200px",
}) => {
  return (
    <Popover
      renderTrigger={(props) => <IconMenuButton icon={icon} {...props} />}
      placement={"right"}
      trigger={["hover", "focus"]}
      disablePadding
    >
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
    </Popover>
  );
};
