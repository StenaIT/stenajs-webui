import * as React from "react";
import { ReactNode } from "react";
import { Box, Column } from "@stenajs-webui/core";
import { RailContext } from "./RailContext";
import { cssColor } from "@stenajs-webui/theme";
import {
  IconMenuButton,
  stenaAngleLeftDouble,
  stenaHamburger,
} from "@stenajs-webui/elements";
import { RailMenuButton } from "../items/RailMenuButton";

interface SidebarRailMenuProps {
  closeButtonVisible?: boolean;
  onClickCloseButton?: () => void;
  onClickMenuButton?: () => void;
  children?: ReactNode;
  bottomItems?: ReactNode;
  closeButtonTitle?: string;
}

export const SidebarRailMenu: React.FC<SidebarRailMenuProps> = ({
  closeButtonVisible,
  onClickCloseButton,
  onClickMenuButton,
  children,
  bottomItems,
  closeButtonTitle = "Unpin menu",
}) => {
  return (
    <Box
      position={"fixed"}
      left={0}
      top={0}
      bottom={0}
      indent={0.5}
      spacing={1}
      gap={1}
      shadow={"popover"}
      background={cssColor("--lhds-color-ui-50")}
    >
      <IconMenuButton onClick={onClickMenuButton} icon={stenaHamburger} />
      <Column justifyContent={"space-between"} flex={1} gap={1}>
        <Column gap={1}>
          <RailContext.Provider value={true}>{children}</RailContext.Provider>
        </Column>
        <Column gap={1}>
          {(bottomItems || closeButtonVisible) && (
            <RailContext.Provider value={true}>
              {bottomItems}
              {closeButtonVisible && (
                <RailMenuButton
                  icon={stenaAngleLeftDouble}
                  label={closeButtonTitle}
                  onClick={onClickCloseButton}
                />
              )}
            </RailContext.Provider>
          )}
        </Column>
      </Column>
    </Box>
  );
};
