import * as React from "react";
import { ReactNode, useCallback } from "react";
import { Drawer, DrawerProps } from "@stenajs-webui/modal";
import { cssColor } from "@stenajs-webui/theme";
import { Box, Column } from "@stenajs-webui/core";
import { SearchFilterPanelHeader } from "./SearchFilterPanelHeader";
import { useSearchFilterState } from "../context/SearchFilterStateContext";
import { useSearchFilterDispatch } from "../context/SearchFilterDispatchContext";
import { useSearchFilterActions } from "../context/SearchFilterActionsContext";

interface SearchFilterDrawerProps
  extends Omit<DrawerProps, "isOpen" | "onRequestClose"> {
  header?: string;
  headerContentRight?: ReactNode;
}

export const SearchFilterDrawer: React.FC<SearchFilterDrawerProps> = ({
  children,
  header,
  headerContentRight,
  ...drawerProps
}) => {
  const {
    settings: { open },
  } = useSearchFilterState();
  const dispatch = useSearchFilterDispatch();
  const actions = useSearchFilterActions();

  const closeDrawer = useCallback(() => {
    dispatch(actions.closeFilters());
  }, [actions, dispatch]);

  return (
    <Drawer isOpen={open} onRequestClose={closeDrawer} {...drawerProps}>
      <Column
        height={"100%"}
        borderRadius={"var(--swui-border-radius)"}
        background={cssColor("--lhds-color-ui-50")}
      >
        <SearchFilterPanelHeader
          onRequestClose={closeDrawer}
          header={header}
          contentRight={headerContentRight}
        />
        <Box spacing={1} indent={1} gap={1}>
          {children}
        </Box>
      </Column>
    </Drawer>
  );
};
