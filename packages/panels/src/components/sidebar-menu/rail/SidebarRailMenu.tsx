import * as React from "react";
import { ReactNode } from "react";
import { Box, Column } from "@stenajs-webui/core";
import { RailContext } from "./RailContext";
import { cssColor } from "@stenajs-webui/theme";
import {
  MenuButton,
  stenaAngleLeftDouble,
  stenaHamburger,
} from "@stenajs-webui/elements";

interface SidebarRailMenuProps {
  closeButtonVisible?: boolean;
  onClickCloseButton?: () => void;
  onClickMenuButton?: () => void;
  children?: ReactNode;
}

export const SidebarRailMenu: React.FC<SidebarRailMenuProps> = ({
  closeButtonVisible,
  onClickCloseButton,
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
      <MenuButton onClick={onClickMenuButton} leftIcon={stenaHamburger} />
      <Column justifyContent={"space-between"} flex={1} gap={1}>
        <Column gap={1}>
          <RailContext.Provider value={true}>{children}</RailContext.Provider>
        </Column>
        {closeButtonVisible && (
          <MenuButton
            leftIcon={stenaAngleLeftDouble}
            onClick={onClickCloseButton}
          />
        )}
      </Column>
    </Box>
  );
};
