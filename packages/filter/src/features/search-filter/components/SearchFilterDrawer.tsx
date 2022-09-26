import * as React from "react";
import { ReactNode, useCallback } from "react";
import { Drawer, DrawerProps } from "@stenajs-webui/modal";
import { cssColor } from "@stenajs-webui/theme";
import { Column } from "@stenajs-webui/core";
import { SearchFilterPanelHeader } from "./SearchFilterPanelHeader";
import { useSearchFilterState } from "../context/SearchFilterStateContext";
import { useSearchFilterDispatch } from "../context/SearchFilterDispatchContext";
import { useSearchFilterActions } from "../context/SearchFilterActionsContext";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface SearchFilterDrawerProps
  extends Omit<DrawerProps, "isOpen" | "onRequestClose"> {
  header?: string;
  headerIcon?: IconDefinition;
  headerContentRight?: ReactNode;
}

export const SearchFilterDrawer: React.FC<SearchFilterDrawerProps> = ({
  children,
  header,
  headerIcon,
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
    <Drawer
      background={cssColor("--lhds-color-ui-50")}
      width={"370px"}
      isOpen={open}
      onRequestClose={closeDrawer}
      {...drawerProps}
    >
      <Column height={"100%"}>
        <SearchFilterPanelHeader
          onRequestClose={closeDrawer}
          header={header}
          headerIcon={headerIcon}
          contentRight={headerContentRight}
        />
        {children}
      </Column>
    </Drawer>
  );
};
