import * as React from "react";
import { ReactNode } from "react";
import { NavBarSideMenuButton } from "../../nav-bar/NavBarSideMenuButton";
import { Box } from "@stenajs-webui/core";
import { RailContext } from "./RailContext";
import { cssColor } from "@stenajs-webui/theme";

interface RailMenuProps {
  onClickMenuButton?: () => void;
  children?: ReactNode;
}

export const SidebarRailMenu: React.FC<RailMenuProps> = ({
  onClickMenuButton,
  children,
}) => {
  return (
    <Box
      position={"fixed"}
      left={0}
      top={0}
      bottom={0}
      indent={1}
      spacing={1}
      gap={1}
      shadow={"popover"}
      background={cssColor("--lhds-color-ui-50")}
    >
      <NavBarSideMenuButton onClick={onClickMenuButton} />
      <RailContext.Provider value={true}>{children}</RailContext.Provider>
    </Box>
  );
};
